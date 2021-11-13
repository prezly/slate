import { isNonZeroInteger } from './isNonZeroInteger';
import { isNonEmptyString } from './isNonEmptyString';

import { isUploadedFile } from './isUploadedFile';
import { UploadedImage } from '@prezly/uploads';

export function isUploadedImage(
    file: Partial<UploadedImage> | undefined,
): file is UploadedImage {
    return (
        file !== undefined &&
        isUploadedFile(file) &&
        isNonZeroInteger(file.original_height) &&
        isNonZeroInteger(file.original_width) &&
        Array.isArray(file.effects) &&
        file.effects.every(isNonEmptyString)
    );
}