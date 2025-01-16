import { ElementApi, type EditorBeforeOptions, type Node, type SlateEditor } from '@udecode/plate';

export function getDeletionTargetNode(
    editor: SlateEditor,
    { reverse, ...options }: EditorBeforeOptions & { reverse: boolean },
): Node | null {
    if (!editor.selection) {
        return null;
    }

    // From Slate's TextTransforms.delete
    const targetPoint = reverse
        ? editor.api.before(editor.selection, options) || editor.api.start([])
        : editor.api.after(editor.selection, options) || editor.api.end([]);

    const [[targetNode]] = targetPoint
        ? editor.api.nodes({
              at: targetPoint,
              match: (node) => ElementApi.isElement(node),
          })
        : [];

    return targetNode || null;
}
