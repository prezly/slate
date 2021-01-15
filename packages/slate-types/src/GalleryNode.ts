import { UploadcareImageStoragePayload } from './sdk';

export default interface GalleryNode {
    images: {
        /** empty string if no caption */
        caption: string;
        file: UploadcareImageStoragePayload;
    }[];
    layout: 'contained' | 'expanded' | 'full-width';
    padding: 'S' | 'M' | 'L';
    thumbnail_size: 'XS' | 'S' | 'M' | 'L' | 'XL';
    type: 'gallery';
    uuid: string;
}
