import { UploadedFile, validateUploadedFile } from './UploadedFile';
import { isNonEmptyString, isNonZeroInteger } from '../validation';

export interface UploadedImage extends UploadedFile {
    effects: string[];
    original_height: number;
    original_width: number;
}

export function validateUploadedImage(file: Partial<UploadedImage> | undefined): file is UploadedImage {
    return (
        file !== undefined &&
        validateUploadedFile(file) &&
        isNonZeroInteger(file.original_height) &&
        isNonZeroInteger(file.original_width) &&
        Array.isArray(file.effects) &&
        file.effects.every(isNonEmptyString)
    );
}
