import { FileAttachmentElementType } from '../types';

const isUsingCustomTitle = (element: FileAttachmentElementType): boolean =>
    Boolean(element.description);

export default isUsingCustomTitle;
