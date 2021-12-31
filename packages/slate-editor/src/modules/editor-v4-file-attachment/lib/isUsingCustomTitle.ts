import type { AttachmentNode } from '@prezly/slate-types';

function isUsingCustomTitle(element: AttachmentNode): boolean {
    return Boolean(element.description);
}

export default isUsingCustomTitle;
