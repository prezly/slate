import { isObject } from '../nodes/validation';

import type { UploadcareFileStoragePayload } from './UploadcareFileStoragePayload';
import type { UploadcareImageStoragePayload } from './UploadcareImageStoragePayload';

export type UploadcareStoragePayload = UploadcareFileStoragePayload | UploadcareImageStoragePayload;

export function isPrezlyStoragePayload(value: any): value is UploadcareFileStoragePayload {
    return (
        isObject(value) &&
        typeof value.filename === 'string' &&
        typeof value.mime_type === 'string' &&
        typeof value.size === 'number' &&
        typeof value.uuid === 'string'
    );
}
