import { calculateLayout } from './calculateLayout';

describe('calculateLayout', () => {
    const validIdealHeight = 100;
    const validViewportWidth = 100;
    const validImage = { aspectRatio: 1 };
    const validImages = [validImage];

    it('Returns empty array when idealHeight is invalid', () => {
        const invalidIdealHeights = [-100, -1, 0];

        invalidIdealHeights.forEach((invalidIdealHeight) => {
            expect(
                calculateLayout({
                    idealHeight: invalidIdealHeight,
                    images: validImages,
                    viewportWidth: validViewportWidth,
                }),
            ).toEqual([]);
        });
    });

    it('Returns empty array when there are no images', () => {
        expect(
            calculateLayout({
                idealHeight: validIdealHeight,
                images: [],
                viewportWidth: validViewportWidth,
            }),
        ).toEqual([]);
    });

    it('Returns empty array when viewportWidth is invalid', () => {
        const invalidViewportWidths = [-100, -1, 0];

        invalidViewportWidths.forEach((invalidViewportWidth) => {
            expect(
                calculateLayout({
                    idealHeight: validIdealHeight,
                    images: validImages,
                    viewportWidth: invalidViewportWidth,
                }),
            ).toEqual([]);
        });
    });
});
