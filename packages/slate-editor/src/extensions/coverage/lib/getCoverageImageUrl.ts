import type { CoverageEntry } from "@prezly/sdk";
import type { UploadedImage } from "@prezly/uploadcare";
import { UploadcareImage } from "@prezly/uploadcare";

const IMAGE_WIDTH = 580 * 2;

export function getCoverageImageUrl(coverage: CoverageEntry): string | null {
    if (coverage.attachment_oembed && coverage.attachment_oembed.thumbnail_url) {
        return coverage.attachment_oembed.thumbnail_url;
    }

    if (coverage.attachment) {
        try {
            const image = UploadcareImage.createFromPrezlyStoragePayload(coverage.attachment as UploadedImage);
            return image.resize(IMAGE_WIDTH).cdnUrl;
        } catch {
            return null;
        }
    }

    return null;
}
