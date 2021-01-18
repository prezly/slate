import { isObject } from '../lib';

import UploadcareFileStoragePayload from './UploadcareFileStoragePayload';
import UploadcareImageStoragePayload from './UploadcareImageStoragePayload';

type UploadcareStoragePayload = UploadcareFileStoragePayload | UploadcareImageStoragePayload;

export const isPrezlyStoragePayload = (value: any): value is UploadcareFileStoragePayload => {
    return (
        isObject(value) &&
        typeof value.filename === 'string' &&
        typeof value.mime_type === 'string' &&
        typeof value.size === 'number' &&
        typeof value.uuid === 'string'
    );
};

export default UploadcareStoragePayload;
