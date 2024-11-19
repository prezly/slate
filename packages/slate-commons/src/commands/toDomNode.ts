import type { SlateEditor } from '@udecode/plate-common';
import { toDOMNode } from '@udecode/slate-react';
import type { Node } from 'slate';

export function toDomNode(editor: SlateEditor, node: Node): HTMLElement | null {
    // @ts-expect-error TODO: Fix this
    return toDOMNode(editor, node) ?? null;
}
