import { formatBytes } from '../../../lib';
import { Coverage } from '../../../types';

const getCoverageDescription = (coverage: Coverage): string => {
    if (coverage.attachment_oembed && coverage.attachment_oembed.description) {
        return coverage.attachment_oembed.description;
    }

    if (coverage.attachment) {
        return formatBytes(coverage.attachment.size);
    }

    return '';
};

export default getCoverageDescription;
