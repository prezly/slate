import type { SlateEditor } from '@udecode/plate-common';
import type { EditorBeforeOptions, Node } from 'slate';
import { Element } from 'slate';

export function getDeletionTargetNode(
    editor: SlateEditor,
    { reverse, ...options }: EditorBeforeOptions & { reverse: boolean },
): Node | null {
    if (!editor.selection) {
        return null;
    }

    // From Slate's TextTransforms.delete
    const targetPoint = reverse
        ? editor.before(editor.selection, options) || editor.start([])
        : editor.after(editor.selection, options) || editor.end([]);

    const [[targetNode]] = targetPoint
        ? editor.nodes({
              at: targetPoint,
              match: (node) => Element.isElement(node),
          })
        : [];

    return targetNode || null;
}
