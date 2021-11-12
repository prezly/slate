import { isNonEmptyString, isNonZeroInteger, isObject, isUuid } from '../validation';

export interface UploadedFile {
    filename: string;
    mime_type: string;
    size: number;
    uuid: string;
    version: number;
}

export function validateUploadedFile(file: Partial<UploadedFile> | undefined): boolean {
    return (
        isObject(file) &&
        isUuid(file.uuid) &&
        isNonZeroInteger(file.version) &&
        isNonZeroInteger(file.size) &&
        isNonEmptyString(file.mime_type) &&
        isNonEmptyString(file.filename)
    );
}
