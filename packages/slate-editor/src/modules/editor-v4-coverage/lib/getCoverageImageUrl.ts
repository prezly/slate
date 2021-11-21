import type { Coverage } from '@prezly/sdk';
import { UploadcareImage } from '@prezly/uploadcare';

const getCoverageImageUrl = (coverage: Coverage, imageHeight: number): string | null => {
    if (coverage.attachment_oembed && coverage.attachment_oembed.thumbnail_url) {
        return coverage.attachment_oembed.thumbnail_url;
    }

    if (UploadcareImage.isPrezlyStoragePayload(coverage.attachment)) {
        const image = UploadcareImage.createFromPrezlyStoragePayload(coverage.attachment);

        return image.resize(null, imageHeight).cdnUrl;
    }

    return null;
};

export default getCoverageImageUrl;
