import { ImageExtension } from '../../../../types';

const MAX_WIDTH = 3000;
const MAX_HEIGHT = 3000;

const resize = (width: number | null = null, height: number | null = null) => {
    if (width == null && height === null) {
        throw new Error('At least one function argument has to be non-null');
    }

    if (width === null) {
        return `/resize/x${MAX_HEIGHT}/`;
    }

    if (height === null) {
        return `/resize/${MAX_WIDTH}/`;
    }

    const safeWidth = Math.min(width, MAX_WIDTH);
    const safeHeight = Math.min(height, MAX_HEIGHT);

    return `/resize/${safeWidth}x${safeHeight}/`;
};

export const crop = (width: number, height: number) => {
    const safeWidth = Math.min(width, MAX_WIDTH);
    const safeHeight = Math.min(height, MAX_HEIGHT);

    return `/crop/${safeWidth}x${safeHeight}/`;
};

export const format = (format: ImageExtension) => `/format/${format}/`;

export const grayscale = () => '/grayscale/';

export default {
    crop,
    format,
    grayscale,
    resize,
};
