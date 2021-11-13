import { isObject } from './isObject';
import { isUuid } from './isUuid';
import { isNonZeroInteger } from './isNonZeroInteger';
import { isNonEmptyString } from './isNonEmptyString';
import { UploadedFile } from '@prezly/uploads';

export function isUploadedFile(file: Partial<UploadedFile> | undefined): boolean {
    return (
        isObject(file) &&
        isUuid(file.uuid) &&
        isNonZeroInteger(file.version) &&
        isNonZeroInteger(file.size) &&
        isNonEmptyString(file.mime_type) &&
        isNonEmptyString(file.filename)
    );
}