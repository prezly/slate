import { UploadcareImageDetails } from '../../../../types';

const FALLBACK_SIZE = 5;

const getEffectiveWidth = (
    width: number | undefined,
    height: number | undefined,
    imageDetails?: UploadcareImageDetails,
) => {
    const aspectRatio = imageDetails
        ? imageDetails.original_width / imageDetails.original_height
        : null;

    if (typeof width === 'number') {
        return width;
    }

    if (typeof height === 'number' && aspectRatio) {
        return height * aspectRatio;
    }

    return imageDetails?.original_width || FALLBACK_SIZE;
};

const getEffectiveHeight = (
    width: number | undefined,
    height: number | undefined,
    imageDetails?: UploadcareImageDetails,
) => {
    const aspectRatio = imageDetails
        ? imageDetails.original_width / imageDetails.original_height
        : null;

    if (typeof height === 'number') {
        return height;
    }

    if (typeof width === 'number' && aspectRatio) {
        return width / aspectRatio;
    }

    return imageDetails?.original_height || FALLBACK_SIZE;
};

const getEffectiveImageSize = (
    width: number | undefined,
    height: number | undefined,
    imageDetails?: UploadcareImageDetails,
) => ({
    width: getEffectiveWidth(width, height, imageDetails),
    height: getEffectiveHeight(width, height, imageDetails),
});

export default getEffectiveImageSize;
