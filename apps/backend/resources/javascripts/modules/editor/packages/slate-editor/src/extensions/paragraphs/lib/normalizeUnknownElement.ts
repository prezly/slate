import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import { type Element, ElementApi, type NodeEntry, type SlateEditor } from '@udecode/plate';

/**
 * If there's an Element node without a `type` attribute - mark it as paragraph.
 */
export function normalizeUnknownElement(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (!ElementApi.isElement(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    const anyNode: Record<string, unknown> = node as unknown as Record<string, unknown>;

    if (typeof anyNode.type === 'undefined') {
        editor.tf.setNodes({ type: PARAGRAPH_NODE_TYPE } as Partial<Element>, {
            at: path,
        });
        return true;
    }

    return false;
}
