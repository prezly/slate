import { type Editor, type Element, ElementApi, type Node, NodeApi } from '@udecode/plate';

/**
 * The Slate's `Element.isElement()` is explicitly excluding `Editor`.
 */
export function isElementOrEditor(node: Node): node is Element | Editor {
    return ElementApi.isElement(node) || NodeApi.isEditor(node);
}
