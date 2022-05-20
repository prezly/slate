import type { AttachmentNode } from '@prezly/slate-types';

export function isUsingCustomTitle(element: AttachmentNode): boolean {
    return Boolean(element.description);
}
