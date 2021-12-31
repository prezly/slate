import { noop } from '#lodash';

type DataType = 'text/html' | 'text/plain' | 'text/rtf' | 'application/x-slate-fragment';

function iterator() {
    return {
        next: () => {
            throw new Error('Unimplemented');
        },
        [Symbol.iterator]() {
            return this;
        },
    };
}

const dataTransferItemList: DataTransferItemList = {
    [Symbol.iterator]: iterator,
    add: () => null,
    clear: noop,
    length: 0,
    remove: noop,
};

const fileList: FileList = {
    [Symbol.iterator]: iterator,
    item: () => null,
    length: 0,
};

function createDataTransfer(dataMap: Partial<Record<DataType, string>>): DataTransfer {
    return {
        clearData: noop,
        dropEffect: 'none',
        effectAllowed: 'uninitialized',
        files: fileList,
        getData: (type: string) => dataMap[type as DataType] || '',
        items: dataTransferItemList,
        setData: noop,
        setDragImage: noop,
        types: Object.keys(dataMap),
    };
}

export default createDataTransfer;
