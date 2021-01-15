import UploadcareFileStoragePayload from './UploadcareFileStoragePayload';

export default interface UploadcareImageStoragePayload extends UploadcareFileStoragePayload {
    effects: string[];
    original_height: number;
    original_width: number;
}
