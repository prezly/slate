import { UploadcareStoragePayload } from './sdk';

export default interface AttachmentNode {
    description: string;
    file: UploadcareStoragePayload;
    type: 'attachment';
}
