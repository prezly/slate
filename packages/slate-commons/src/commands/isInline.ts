import { isElement, type SlateEditor } from '@udecode/plate-common';
import type { Node } from 'slate';

export function isInline(editor: SlateEditor, node: Node): boolean {
    return isElement(node) && editor.isInline(node);
}
