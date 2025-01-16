import { type Element, TextApi } from '@udecode/plate';

export function isContainingTextNodes(element: Element): boolean {
    return element.children.some(TextApi.isText);
}
