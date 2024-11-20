import type { SlateEditor } from '@udecode/plate-common';
import { toDOMNode } from '@udecode/plate-common/react';
import type { Node } from 'slate';

export function toDomNode(editor: SlateEditor, node: Node): HTMLElement | null {
    // @ts-expect-error TODO: Fix this
    return toDOMNode(editor, node) ?? null;
}
