import { noop } from '@technically/lodash';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types#value
 */
const FILES_TYPE = 'Files';

interface ItemsList extends DataTransferItemList {
    clearFormat(format: string): void;
    getData(format: string): string;
    setData(format: string, data: string): void;
    getTypes(): string[];
}

function createItem(type: string, data: string): DataTransferItem {
    return {
        kind: 'string',
        type,
        getAsString(callback: FunctionStringCallback | null) {
            callback?.(data);
        },
        getAsFile(): File | null {
            return new File([data], 'unnamed', {
                type,
            });
        },
        webkitGetAsEntry(): FileSystemEntry | null {
            return null;
        },
    };
}

function createItemsList(items: Record<string, string>): ItemsList {
    const map = new Map(Object.entries(items));
    const list: DataTransferItem[] = [];

    function updateList(map: Map<string, string>) {
        const updated = [...map.entries()].map(([key, value]) => {
            return createItem(key, value);
        });
        list.splice(0, list.length, ...updated);
    }

    updateList(map);

    function add(data: string, type: string): DataTransferItem | null;
    function add(data: File): DataTransferItem | null;
    function add(data: File | string, type?: string): DataTransferItem | null {
        if (typeof data === 'string') {
            map.set(type ?? 'application/octet-stream', data);
            updateList(map);
        }
        return null;
    }

    return Object.assign(list, {
        add,
        remove(index: number) {
            const item = list[index];
            if (item) {
                map.delete(item.type);
                updateList(map);
            }
        },
        clear() {
            map.clear();
            updateList(map);
        },
        clearFormat(format: string) {
            map.delete(format);
            updateList(map);
        },
        getData(format: string) {
            return map.get(format) ?? '';
        },
        setData(format: string, data: string) {
            map.set(format, data);
            updateList(map);
        },
        getTypes(): string[] {
            return Array.from(map.keys());
        },
    });
}

function createFileList(files: File[] | Iterable<File> = []): FileList {
    const list = Array.from(files);
    return Object.assign(list, {
        item(index: number) {
            return list[index];
        },
    });
}

export function createDataTransfer(
    props: Partial<{
        dropEffect: DataTransfer['dropEffect'];
        effectAllowed: DataTransfer['effectAllowed'];
        files: DataTransfer['files'] | File[];
        items: Record<string, string>;
    }> = {},
): DataTransfer {
    const { dropEffect = 'none', effectAllowed = 'uninitialized', files = [], items = {} } = props;

    const itemsStore = createItemsList(items);
    const fileStore = createFileList(files);

    const dataTransfer = {
        dropEffect,
        effectAllowed,
        files: fileStore,
        items: itemsStore,
        getData(type: string) {
            return itemsStore.getData(type);
        },
        clearData(format?: string) {
            if (typeof format === 'string') {
                itemsStore.clearFormat(format);
            } else {
                itemsStore.clear();
            }
        },
        setData(format, data) {
            itemsStore.setData(format, data);
        },
        setDragImage: noop,
        types: [],
    } satisfies DataTransfer;

    Object.defineProperty(dataTransfer, 'types', {
        get: () => {
            if (fileStore.length > 0) {
                return [...itemsStore.getTypes(), FILES_TYPE];
            }
            return itemsStore.getTypes();
        },
    });

    return dataTransfer;
}

export function filterDataTransferItems(
    dataTransfer: DataTransfer,
    filter: (item: DataTransferItem, index: number) => boolean,
) {
    const items = Object.fromEntries(
        Array.from(dataTransfer.items)
            .filter(filter)
            .map((item) => [item.type, dataTransfer.getData(item.type)]),
    );

    return createDataTransfer({
        dropEffect: dataTransfer.dropEffect,
        effectAllowed: dataTransfer.effectAllowed,
        files: dataTransfer.files,
        items,
    });
}

export function filterDataTransferFiles(
    dataTransfer: DataTransfer,
    filter: (file: File, index: number) => boolean,
) {
    const items = Object.fromEntries(
        Array.from(dataTransfer.items).map((item) => [item.type, dataTransfer.getData(item.type)]),
    );
    const files = Array.from(dataTransfer.files).filter(filter);

    return createDataTransfer({
        dropEffect: dataTransfer.dropEffect,
        effectAllowed: dataTransfer.effectAllowed,
        files,
        items,
    });
}

export function isFilesOnlyDataTransfer(dataTransfer: DataTransfer) {
    const types = dataTransfer.types;

    return types.length === 1 && types[0] === FILES_TYPE;
}
