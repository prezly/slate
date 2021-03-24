import { UploadcareFile } from '@prezly/uploadcare';
import { Element, Node } from 'slate';

import { FILE_ATTACHMENT_TYPE } from '../constants';
import { FileAttachmentElementType } from '../types';

const isFileAttachmentElement = (node: Node): node is FileAttachmentElementType =>
    Element.isElement(node) &&
    node.type === FILE_ATTACHMENT_TYPE &&
    typeof node.description === 'string' &&
    UploadcareFile.isPrezlyStoragePayload(node.file);

export default isFileAttachmentElement;
