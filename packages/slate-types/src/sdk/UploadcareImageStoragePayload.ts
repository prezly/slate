import { UploadcareFileStoragePayload } from './UploadcareFileStoragePayload';

export interface UploadcareImageStoragePayload extends UploadcareFileStoragePayload {
    effects: string[];
    original_height: number;
    original_width: number;
}
