import { calculateLayout } from './calculateLayout';

describe('calculateLayout', () => {
    const images = [
        { aspectRatio: 0.5 },
        { aspectRatio: 1 },
        { aspectRatio: 1 },
        { aspectRatio: 0.5 },
    ];

    it('should return empty array when idealHeight is invalid', () => {
        const invalidIdealHeights = [-100, -1, 0];

        invalidIdealHeights.forEach((invalidIdealHeight) => {
            expect(
                calculateLayout({
                    idealHeight: invalidIdealHeight,
                    images,
                    viewportWidth: 100,
                }),
            ).toEqual([]);
        });
    });

    it('should return empty array when there are no images', () => {
        expect(
            calculateLayout({
                idealHeight: 100,
                images: [],
                viewportWidth: 100,
            }),
        ).toEqual([]);
    });

    it('should return empty array when viewportWidth is invalid', () => {
        const invalidViewportWidths = [-100, -1, 0];

        invalidViewportWidths.forEach((invalidViewportWidth) => {
            expect(
                calculateLayout({
                    idealHeight: 100,
                    images,
                    viewportWidth: invalidViewportWidth,
                }),
            ).toEqual([]);
        });
    });

    it('should calculate single-row layout', () => {
        const layout = calculateLayout({
            idealHeight: 100,
            viewportWidth: 400,
            margin: 0,
            images,
        });

        expect(layout).toEqual([
            [
                { width: 67, height: 133, image: images[0] },
                { width: 133, height: 133, image: images[1] },
                { width: 133, height: 133, image: images[2] },
                { width: 67, height: 133, image: images[3] },
            ],
        ]);
    });

    it('should calculate two-row layout', () => {
        const layout = calculateLayout({
            idealHeight: 200,
            viewportWidth: 400,
            margin: 0,
            images,
        });

        expect(layout).toEqual([
            [
                { width: 133, height: 267, image: images[0] },
                { width: 267, height: 267, image: images[1] },
            ],
            [
                { width: 267, height: 267, image: images[2] },
                { width: 133, height: 267, image: images[3] },
            ],
        ]);
    });

    it('should calculate layout preserving images aspect ratio taking margin into account', () => {
        const layout = calculateLayout({
            idealHeight: 200,
            viewportWidth: 400,
            margin: 10,
            images,
        });

        expect(layout).toHaveLength(2);
        expect(layout[0]).toHaveLength(2);
        expect(layout[1]).toHaveLength(2);

        layout.forEach((row) => {
            row.forEach(({ width, height, image }) => {
                expect(width / height).toBeCloseTo(image.aspectRatio);
            });
        });
    });
});
