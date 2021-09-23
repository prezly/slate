import { AttachmentNode } from '@prezly/slate-types';

const isUsingCustomTitle = (element: AttachmentNode): boolean => Boolean(element.description);

export default isUsingCustomTitle;
