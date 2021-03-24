import { UploadcareImage } from '@prezly/uploadcare';

import { GalleryImage } from '../types';

const isGalleryImage = (image: any): image is GalleryImage =>
    typeof image === 'object' &&
    image !== null &&
    typeof image.caption === 'string' &&
    UploadcareImage.isPrezlyStoragePayload(image.file);

export default isGalleryImage;
