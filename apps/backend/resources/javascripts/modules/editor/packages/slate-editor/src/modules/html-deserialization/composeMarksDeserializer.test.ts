import { composeMarksDeserializer } from './composeMarksDeserializer';

describe('composeMarksDeserializer', () => {
    it('should compose deserializers list into a single function, executing them in the given order', () => {
        const deserializeElement = composeMarksDeserializer([
            (element: HTMLElement) => {
                if (element.tagName === 'B' || element.tagName === 'STRONG') {
                    return { bold: true };
                }
                return undefined;
            },
            (element: HTMLElement) => {
                if (element.tagName === 'EM' || element.tagName === 'I') {
                    return { italic: true };
                }
                return undefined;
            },
        ]);

        const b = document.createElement('b');
        const strong = document.createElement('strong');
        const em = document.createElement('em');
        const u = document.createElement('u');

        expect(deserializeElement(b)).toEqual({ bold: true });
        expect(deserializeElement(strong)).toEqual({ bold: true });
        expect(deserializeElement(em)).toEqual({ italic: true });
        expect(deserializeElement(u)).toBeUndefined();
    });

    it('should combine tag-name deserializers map into a single function', () => {
        const deserializeElement = composeMarksDeserializer({
            B: () => ({ bold: true }),
            STRONG: () => ({ bold: true }),
            EM: () => ({ italic: true }),
            I: () => ({ italic: true }),
            U: () => ({ underline: true }),
        });

        const b = document.createElement('b');
        const strong = document.createElement('strong');
        const em = document.createElement('em');
        const u = document.createElement('u');
        const span = document.createElement('span');

        expect(deserializeElement(b)).toEqual({ bold: true });
        expect(deserializeElement(strong)).toEqual({ bold: true });
        expect(deserializeElement(em)).toEqual({ italic: true });
        expect(deserializeElement(u)).toEqual({ underline: true });
        expect(deserializeElement(span)).toBeUndefined();
    });

    it('should be able to compose complex deserialization hierarchies', () => {
        const deserializeElement = composeMarksDeserializer([
            composeMarksDeserializer({
                B: () => ({ bold: true }),
                STRONG: () => ({ bold: true }),
            }),
            composeMarksDeserializer({
                EM: () => ({ italic: true }),
                I: () => ({ italic: true }),
            }),
        ]);

        const b = document.createElement('b');
        const strong = document.createElement('strong');
        const em = document.createElement('em');
        const u = document.createElement('u');
        const span = document.createElement('span');

        expect(deserializeElement(b)).toEqual({ bold: true });
        expect(deserializeElement(strong)).toEqual({ bold: true });
        expect(deserializeElement(em)).toEqual({ italic: true });
        expect(deserializeElement(u)).toBeUndefined();
        expect(deserializeElement(span)).toBeUndefined();
    });
});
