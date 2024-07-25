import type { CoverageEntry } from "@prezly/sdk";
import type { UploadedImage } from "@prezly/uploadcare";
import { UploadcareImage } from "@prezly/uploadcare";

const IMAGE_WIDTH = 580 * 2;

export function getCoverageImageUrl(coverage: CoverageEntry): string | null {
    if (coverage.attachment_oembed && coverage.attachment_oembed.thumbnail_url) {
        return coverage.attachment_oembed.thumbnail_url;
    }

    // @ts-expect-error `isImage` is not defined in the type but it is present
    if (coverage.attachment && coverage.attachment.isImage) {
        try {
            const image = UploadcareImage.createFromPrezlyStoragePayload(coverage.attachment as UploadedImage);
            return image.resize(IMAGE_WIDTH).cdnUrl;
        } catch {
            return null;
        }
    }

    return null;
}
