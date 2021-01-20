import { FileInfo } from 'uploadcare-widget';

import { UPLOADCARE_CDN_URL } from '../constants';

import UploadcareFileStoragePayload from './UploadcareFileStoragePayload';

interface UploadcareFileParameters {
    filename: UploadcareFileStoragePayload['filename'];
    mimeType: UploadcareFileStoragePayload['mime_type'];
    size: UploadcareFileStoragePayload['size'];
    uuid: UploadcareFileStoragePayload['uuid'];
}

const fromStoragePayload = ({
    filename,
    mime_type: mimeType,
    size,
    uuid,
}: UploadcareFileStoragePayload) => ({
    filename,
    mimeType,
    size,
    uuid,
});

const toStoragePayload = ({ uuid, filename, size, mimeType }: UploadcareFileParameters) => ({
    filename,
    mime_type: mimeType,
    size,
    uuid,
    version: 2,
});

const fromWidgetPayload = ({ uuid, name: filename, size, mimeType }: FileInfo) => ({
    filename,
    mimeType,
    size,
    uuid,
});

export default class UploadcareFile {
    static createFromPrezlyStoragePayload = (
        payload: UploadcareFileStoragePayload,
    ): UploadcareFile => new UploadcareFile(fromStoragePayload(payload));

    static createFromUploadcareWidgetPayload = (payload: FileInfo): UploadcareFile =>
        new UploadcareFile(fromWidgetPayload(payload));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isPrezlyStoragePayload = (payload: any): payload is UploadcareFileStoragePayload => {
        return (
            payload !== null &&
            typeof payload === 'object' &&
            typeof payload.filename === 'string' &&
            typeof payload.mime_type === 'string' &&
            typeof payload.size === 'number' &&
            typeof payload.uuid === 'string'
        );
    };

    public cdnUrl: string;

    public downloadUrl: string;

    public filename: string;

    public mimeType: string;

    public size: number;

    public uuid: string;

    constructor({ filename, mimeType, size, uuid }: UploadcareFileParameters) {
        this.uuid = uuid;
        this.filename = filename;
        this.size = size;
        this.mimeType = mimeType;
        this.cdnUrl = `${UPLOADCARE_CDN_URL}/${uuid}/`;
        this.downloadUrl = `${UPLOADCARE_CDN_URL}/${uuid}/-/inline/no/${encodeURIComponent(
            filename,
        )}`;
    }

    get isImage() {
        return this.mimeType.startsWith('image/');
    }

    toPrezlyStoragePayload = (): UploadcareFileStoragePayload =>
        toStoragePayload({
            filename: this.filename,
            mimeType: this.mimeType,
            size: this.size,
            uuid: this.uuid,
        });
}
