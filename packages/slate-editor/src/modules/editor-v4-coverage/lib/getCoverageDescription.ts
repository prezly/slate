import type { Coverage } from '@prezly/sdk';

import { formatBytes } from '#lib';

export function getCoverageDescription(coverage: Coverage): string {
    if (coverage.attachment_oembed && coverage.attachment_oembed.description) {
        return coverage.attachment_oembed.description;
    }

    if (coverage.attachment) {
        return formatBytes(coverage.attachment.size);
    }

    return '';
}
