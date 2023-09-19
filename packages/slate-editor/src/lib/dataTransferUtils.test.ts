import {
    createDataTransfer,
    filterDataTransferFiles,
    filterDataTransferItems,
} from './dataTransferUtils';

describe('createDataTransfer', () => {
    it('should create an object compatible with DataTranfer interface', () => {
        const dataTransfer = createDataTransfer({
            dropEffect: 'move',
            effectAllowed: 'copy',
            items: {
                'text/plain': 'Hello world',
                'text/html': '<h1>Hello world</h1>',
            },
            files: [new File(['Hello world'], 'helloworld.txt')],
        });

        expect(dataTransfer.dropEffect).toBe('move');
        expect(dataTransfer.effectAllowed).toBe('copy');
        expect(dataTransfer.getData('text/plain')).toBe('Hello world');
        expect(dataTransfer.getData('text/html')).toBe('<h1>Hello world</h1>');
        expect(dataTransfer.getData('application/json')).toBe('');
        expect(dataTransfer.files).toHaveLength(1);
    });

    it('should clear data', () => {
        const dataTransfer = createDataTransfer({
            items: {
                'text/plain': 'Hello world',
                'text/html': '<h1>Hello world</h1>',
            },
            files: [new File(['Hello world'], 'helloworld.txt')],
        });

        expect(dataTransfer.getData('text/plain')).toBe('Hello world');
        expect(dataTransfer.getData('text/html')).toBe('<h1>Hello world</h1>');
        expect(dataTransfer.getData('application/json')).toBe('');
        expect(dataTransfer.files).toHaveLength(1);

        dataTransfer.clearData();

        expect(dataTransfer.getData('text/plain')).toBe('');
        expect(dataTransfer.getData('text/html')).toBe('');
        expect(dataTransfer.getData('application/json')).toBe('');
        expect(dataTransfer.files).toHaveLength(1);
    });

    it('should clear data of specified format', () => {
        const dataTransfer = createDataTransfer({
            items: {
                'text/plain': 'Hello world',
                'text/html': '<h1>Hello world</h1>',
            },
            files: [new File(['Hello world'], 'helloworld.txt')],
        });

        expect(dataTransfer.getData('text/plain')).toBe('Hello world');
        expect(dataTransfer.getData('text/html')).toBe('<h1>Hello world</h1>');
        expect(dataTransfer.getData('application/json')).toBe('');
        expect(dataTransfer.files).toHaveLength(1);

        dataTransfer.clearData('text/html');

        expect(dataTransfer.getData('text/plain')).toBe('Hello world');
        expect(dataTransfer.getData('text/html')).toBe('');
        expect(dataTransfer.getData('application/json')).toBe('');
        expect(dataTransfer.files).toHaveLength(1);
    });

    it('should set data', () => {
        const dataTransfer = createDataTransfer({
            items: {
                'text/plain': 'Hello world',
                'text/html': '<h1>Hello world</h1>',
            },
            files: [new File(['Hello world'], 'helloworld.txt')],
        });

        expect(dataTransfer.getData('text/plain')).toBe('Hello world');
        expect(dataTransfer.getData('text/html')).toBe('<h1>Hello world</h1>');
        expect(dataTransfer.getData('application/json')).toBe('');
        expect(dataTransfer.files).toHaveLength(1);

        dataTransfer.setData('text/plain', 'Hi everyone!');
        dataTransfer.setData('application/json', '{ "content": "Hi everyone!" }');

        expect(dataTransfer.getData('text/plain')).toBe('Hi everyone!');
        expect(dataTransfer.getData('text/html')).toBe('<h1>Hello world</h1>');
        expect(dataTransfer.getData('application/json')).toBe('{ "content": "Hi everyone!" }');
        expect(dataTransfer.getData('application/octet-stream')).toBe('');
        expect(dataTransfer.files).toHaveLength(1);
    });

    it('should report types', () => {
        const dataTransfer = createDataTransfer({
            items: {
                'text/plain': 'Hello world',
                'text/html': '<h1>Hello world</h1>',
            },
        });

        expect(dataTransfer.types).toEqual(['text/plain', 'text/html']);
    });

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types#value
     */
    it('should report types with "Files" entry, if there are files', () => {
        const dataTransfer = createDataTransfer({
            items: {
                'text/plain': 'Hello world',
                'text/html': '<h1>Hello world</h1>',
            },
            files: [new File(['Hello world'], 'helloworld.txt')],
        });

        expect(dataTransfer.types).toEqual(['text/plain', 'text/html', 'Files']);
    });

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types#value
     */
    it('should report types with a single "Files" entry if there are only files', () => {
        const dataTransfer = createDataTransfer({
            files: [new File(['Hello world'], 'helloworld.txt')],
        });

        expect(dataTransfer.types).toEqual(['Files']);
    });

    it('should allow adding items via DataTransferItemList interface', () => {
        const dataTransfer = createDataTransfer();

        dataTransfer.items.add('Hello', 'text/plain');

        expect(dataTransfer.getData('text/plain')).toBe('Hello');
        expect(dataTransfer.types).toEqual(['text/plain']);
    });

    it('should allow removing items via DataTransferItemList interface', () => {
        const dataTransfer = createDataTransfer({
            items: {
                'text/plain': 'Hello world',
                'text/html': '<h1>Hello world</h1>',
                'application/json': '{ "content": "Hi everyone!" }',
            },
        });

        dataTransfer.items.remove(1);

        expect(dataTransfer.getData('text/plain')).toBe('Hello world');
        expect(dataTransfer.getData('text/html')).toBe('');
        expect(dataTransfer.getData('application/json')).toBe('{ "content": "Hi everyone!" }');

        expect(dataTransfer.types).toEqual(['text/plain', 'application/json']);
    });

    it('should allow clearing items via DataTransferItemList interface', () => {
        const dataTransfer = createDataTransfer({
            items: {
                'text/plain': 'Hello world',
                'text/html': '<h1>Hello world</h1>',
                'application/json': '{ "content": "Hi everyone!" }',
            },
        });

        dataTransfer.items.clear();

        expect(dataTransfer.items).toHaveLength(0);
        expect(dataTransfer.getData('text/plain')).toBe('');
        expect(dataTransfer.getData('text/html')).toBe('');
        expect(dataTransfer.getData('application/json')).toBe('');

        expect(dataTransfer.types).toEqual([]);
    });

    it('should allow adding items via DataTransferItemList interface', () => {
        const dataTransfer = createDataTransfer({
            items: {
                'application/json': '{ "content": "Hi everyone!" }',
            },
        });

        dataTransfer.items.add('Hi!', 'text/plain');

        expect(dataTransfer.items).toHaveLength(2);

        expect(dataTransfer.getData('text/plain')).toBe('Hi!');
        expect(dataTransfer.getData('application/json')).toBe('{ "content": "Hi everyone!" }');

        expect(dataTransfer.types).toEqual(['application/json', 'text/plain']);
    });
});

describe('filterDataTransferFiles', () => {
    it('should filter DataTransfer object files with the given callback', () => {
        const dataTransfer = createDataTransfer({
            items: {
                'text/plain': 'Hello world',
                'text/html': '<h1>Hello world</h1>',
            },
            files: [
                new File(['Hello world'], 'helloworld.txt', {
                    type: 'text/plain',
                }),
                new File(['<h1>Hello world</h1>'], 'helloworld.html', {
                    type: 'text/html',
                }),
            ],
        });

        const filtered = filterDataTransferFiles(dataTransfer, (file) => file.type !== 'text/html');

        expect(filtered.files).toHaveLength(1);
        expect(filtered.files[0].name).toBe('helloworld.txt');
    });
});

describe('filterDataTransferItems', () => {
    it('should filter DataTransfer object files with the given callback', () => {
        const dataTransfer = createDataTransfer({
            items: {
                'text/plain': 'Hello world',
                'text/html': '<h1>Hello world</h1>',
            },
            files: [
                new File(['Hello world'], 'helloworld.txt', {
                    type: 'text/plain',
                }),
                new File(['<h1>Hello world</h1>'], 'helloworld.html', {
                    type: 'text/html',
                }),
            ],
        });

        const filtered = filterDataTransferItems(
            dataTransfer,
            (item) => item.type !== 'text/plain',
        );

        expect(filtered.items).toHaveLength(1);
        expect(filtered.items[0].type).toBe('text/html');
    });
});
