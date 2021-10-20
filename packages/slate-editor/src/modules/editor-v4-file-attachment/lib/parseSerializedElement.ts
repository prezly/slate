import { AttachmentNode, isAttachmentNode } from '@prezly/slate-types';

import createFileAttachment from './createFileAttachment';

const parseSerializedElement = (serialized: string): AttachmentNode | undefined => {
    const parsed = JSON.parse(serialized);

    if (isAttachmentNode(parsed)) {
        return createFileAttachment(parsed.file, parsed.description);
    }

    return undefined;
};

export default parseSerializedElement;
