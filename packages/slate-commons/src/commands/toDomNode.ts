import type { SlateEditor, TNode } from '@udecode/plate-common';
import { toDOMNode } from '@udecode/plate-common/react';

export function toDomNode(editor: SlateEditor, node: TNode): HTMLElement | null {
    return toDOMNode(editor, node) ?? null;
}
