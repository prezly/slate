import type { SlateEditor } from '@udecode/plate-common';
import {  isElement } from '@udecode/slate';
import type { Node } from 'slate';

export function isVoid(editor: SlateEditor, node: Node): boolean {
    return isElement(node) && editor.isVoid(node);
}
