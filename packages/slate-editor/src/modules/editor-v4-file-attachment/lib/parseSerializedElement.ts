import { FileAttachmentElementType } from '../types';

import createFileAttachment from './createFileAttachment';
import isFileAttachmentElement from './isFileAttachmentElement';

const parseSerializedElement = (serialized: string): FileAttachmentElementType | undefined => {
    const parsed = JSON.parse(serialized);

    if (isFileAttachmentElement(parsed)) {
        return createFileAttachment(parsed.file, parsed.description);
    }

    return undefined;
};

export default parseSerializedElement;
