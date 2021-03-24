import { Coverage } from '../../../types';

const hasOnlyFileAttachment = (coverage: Coverage): boolean => {
    if (coverage.attachment_oembed && coverage.attachment_oembed.description) {
        return false;
    }

    if (coverage.attachment) {
        return true;
    }

    return false;
};

export default hasOnlyFileAttachment;
