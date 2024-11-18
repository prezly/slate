import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import type { Node, NodeEntry } from 'slate';
import { Element } from 'slate';

/**
 * If there's an Element node without a `type` attribute - mark it as paragraph.
 */
export function normalizeUnknownElement(editor: SlateEditor, [node, path]: NodeEntry<Node>): boolean {
    if (!Element.isElement(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const anyNode: Record<string, unknown> = node as unknown as Record<string, unknown>;

    if (typeof anyNode.type === 'undefined') {
        editor.setNodes({ type: PARAGRAPH_NODE_TYPE } as Partial<Element>, {
            at: path,
        });
        return true;
    }

    return false;
}
