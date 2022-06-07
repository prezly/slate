import { combineDeserializers } from './getElementDeserializers';

describe('combineDeserializers', () => {
    it('should combine same-tag-name serializers into a single function', () => {
        const combined = combineDeserializers(
            {
                P: function () {
                    return { type: 'paragraph' };
                },
            },
            {
                P: function (element: HTMLElement) {
                    if (element.classList.contains('divider')) {
                        return { type: 'divider' };
                    }
                    return undefined;
                },
            },
        );

        const paragraph = document.createElement('p');

        const divider = document.createElement('p');
        divider.classList.add('divider');

        expect(combined['P'](paragraph)).toEqual({ type: 'paragraph' });
        expect(combined['P'](divider)).toEqual({ type: 'divider' });
    });
});
