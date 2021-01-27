import { GalleryNode, UploadcareImage } from '@prezly/slate-types';

const prepareImages = (node: GalleryNode, maxViewportWidth: number): UploadcareImage[] => {
    return node.images
        .map(({ caption, file }) => UploadcareImage.createFromPrezlyStoragePayload(file, caption))
        .map((image) => image.preview(maxViewportWidth));
};

export default prepareImages;
