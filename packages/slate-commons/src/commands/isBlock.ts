import type { SlateEditor } from '@udecode/plate-common';
import { Element } from 'slate';
import type { Node } from 'slate';

export function isBlock(editor: SlateEditor, node: Node): boolean {
    return Element.isElement(node) && editor.isBlock(node);
}
