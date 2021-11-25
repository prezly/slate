import { linearPartition } from '@prezly/linear-partition';

interface BaseImage {
    aspectRatio: number;
}

interface Parameters<Image extends BaseImage> {
    idealHeight: number;
    images: Image[];
    viewportWidth: number;
}

interface Cell<Image extends BaseImage> {
    height: number;
    image: Image;
    width: number;
}

type Layout<Image extends BaseImage> = Cell<Image>[][];

const calculateLayout = <Image extends BaseImage>({
    idealHeight,
    images,
    viewportWidth,
}: Parameters<Image>): Layout<Image> => {
    if (idealHeight <= 0 || viewportWidth <= 0 || images.length === 0) {
        return [];
    }

    const totalWidth = images.reduce((sum, image) => sum + image.aspectRatio * idealHeight, 0);
    const rowsCount = Math.max(
        1, // forceFullWidth
        Math.round(totalWidth / viewportWidth),
    );

    const weights = images.map((image) => 100 * image.aspectRatio);
    const partition = linearPartition(weights, rowsCount);
    const computedRows: Layout<Image> = [];

    let index = 0;
    partition.forEach((row) => {
        const rowBuffer = row.map((_, rowImageIndex) => images[index + rowImageIndex]);
        const aspectRatioSum = rowBuffer.reduce((sum, image) => sum + image.aspectRatio, 0);
        let widthSum = 0;
        const computedRow: Cell<Image>[] = [];

        rowBuffer.forEach((image, rowImageIndex) => {
            const width =
                rowImageIndex === rowBuffer.length - 1
                    ? viewportWidth - widthSum
                    : (viewportWidth / aspectRatioSum) * image.aspectRatio;
            const height = viewportWidth / aspectRatioSum;
            widthSum += width;
            computedRow.push({ width, height, image });
        });
        computedRows.push(computedRow);
        index += row.length;
    });

    return computedRows;
};

export default calculateLayout;
