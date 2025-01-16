import { composeElementDeserializer } from './composeElementDeserializer';

describe('composeElementDeserializer', () => {
    it('should compose deserializers list into a single function, executing them in the given order', () => {
        const deserializeElement = composeElementDeserializer([
            (element: HTMLElement) => {
                if (element.classList.contains('divider')) {
                    return { type: 'divider' };
                }
                return undefined;
            },
            (element: HTMLElement) => {
                if (element instanceof HTMLParagraphElement) {
                    return { type: 'paragraph' };
                }
                return undefined;
            },
        ]);

        const divider = document.createElement('p');
        divider.classList.add('divider');

        const paragraph = document.createElement('p');

        const div = document.createElement('div');

        expect(deserializeElement(divider)).toEqual({ type: 'divider' });
        expect(deserializeElement(paragraph)).toEqual({ type: 'paragraph' });
        expect(deserializeElement(div)).toBeUndefined();
    });

    it('should combine tag-name deserializers map into a single function', () => {
        const deserializeElement = composeElementDeserializer({
            P: () => ({ type: 'paragraph' }),
            HR: () => ({ type: 'divider' }),
        });

        const paragraph = document.createElement('p');
        const hr = document.createElement('hr');
        const div = document.createElement('div');

        expect(deserializeElement(paragraph)).toEqual({ type: 'paragraph' });
        expect(deserializeElement(hr)).toEqual({ type: 'divider' });
        expect(deserializeElement(div)).toBeUndefined();
    });

    it('should be able to compose complex deserialization hierarchies', () => {
        const deserializeElement = composeElementDeserializer([
            composeElementDeserializer({
                P: function (element: HTMLElement) {
                    if (element.classList.contains('divider')) {
                        return { type: 'divider' };
                    }
                    return undefined;
                },
                HR: () => ({ type: 'divider' }),
            }),
            composeElementDeserializer({
                P: () => ({ type: 'paragraph' }),
            }),
        ]);

        const paragraph = document.createElement('p');
        const div = document.createElement('div');
        const hr = document.createElement('hr');
        const divider = document.createElement('p');
        divider.classList.add('divider');

        expect(deserializeElement(paragraph)).toEqual({ type: 'paragraph' });
        expect(deserializeElement(divider)).toEqual({ type: 'divider' });
        expect(deserializeElement(hr)).toEqual({ type: 'divider' });
        expect(deserializeElement(div)).toBeUndefined();
    });
});
