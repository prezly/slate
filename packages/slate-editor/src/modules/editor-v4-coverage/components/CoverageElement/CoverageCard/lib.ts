import type { Coverage } from '@prezly/sdk';
import { UploadcareImage } from '@prezly/uploadcare';

import { formatBytes } from '#lib';

export function getCoverageTitle(coverage: Coverage): string {
    if (coverage.attachment_oembed && coverage.attachment_oembed.title) {
        return coverage.attachment_oembed.title;
    }

    if (coverage.attachment) {
        return coverage.attachment.filename;
    }

    return 'Untitled';
}

export function getCoverageImageUrl(coverage: Coverage, imageHeight: number): string | null {
    if (coverage.attachment_oembed && coverage.attachment_oembed.thumbnail_url) {
        return coverage.attachment_oembed.thumbnail_url;
    }

    if (UploadcareImage.isPrezlyStoragePayload(coverage.attachment)) {
        const image = UploadcareImage.createFromPrezlyStoragePayload(coverage.attachment);

        return image.resize(null, imageHeight).cdnUrl;
    }

    return null;
}

export function getCoverageDescription(coverage: Coverage): string {
    if (coverage.attachment_oembed && coverage.attachment_oembed.description) {
        return coverage.attachment_oembed.description;
    }

    if (coverage.attachment) {
        return formatBytes(coverage.attachment.size);
    }

    return '';
}

export function hasOnlyFileAttachment(coverage: Coverage): boolean {
    if (coverage.attachment_oembed && coverage.attachment_oembed.description) {
        return false;
    }

    if (coverage.attachment) {
        return true;
    }

    return false;
}
