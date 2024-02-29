import { linearPartition } from '@prezly/linear-partition';

interface BaseImage {
    aspectRatio: number;
}

interface Parameters<Image extends BaseImage> {
    idealHeight: number;
    images: Image[];
    viewportWidth: number;
    margin?: number;
}

export interface Tile<Image extends BaseImage> {
    height: number;
    image: Image;
    width: number;
}

type Layout<Image extends BaseImage> = Tile<Image>[][];

export function calculateLayout<Image extends BaseImage>({
    idealHeight,
    images,
    viewportWidth,
    margin = 0,
}: Parameters<Image>): Layout<Image> {
    if (idealHeight <= 0 || viewportWidth <= 0 || images.length === 0) {
        return [];
    }

    const totalWidth = images.reduce(
        (sum, image) => sum + Math.max(idealHeight, image.aspectRatio * idealHeight),
        0,
    );
    const rowsCount = Math.max(
        1, // forceFullWidth
        Math.ceil(totalWidth / viewportWidth),
    );

    const weights = images.map((image) => 100 * image.aspectRatio);
    const partition = linearPartition(weights, rowsCount);
    const computedRows: Layout<Image> = [];

    let offset = 0;
    partition.forEach((row) => {
        const rowBuffer = row.map((_, rowImageIndex) => images[offset + rowImageIndex]);
        const aspectRatioSum = rowBuffer.reduce((sum, image) => sum + image.aspectRatio, 0);
        let widthUsed = 0;
        const computedRow: Tile<Image>[] = [];
        const contentWidth = viewportWidth - (rowBuffer.length - 1) * margin;

        rowBuffer.forEach((image, rowImageIndex) => {
            const width = Math.round(
                rowImageIndex === rowBuffer.length - 1
                    ? contentWidth - widthUsed
                    : (contentWidth * image.aspectRatio) / aspectRatioSum,
            );
            const height = Math.round(contentWidth / aspectRatioSum);
            widthUsed += width;
            computedRow.push({ width, height, image });
        });
        computedRows.push(computedRow);
        offset += row.length;
    });

    return computedRows;
}
