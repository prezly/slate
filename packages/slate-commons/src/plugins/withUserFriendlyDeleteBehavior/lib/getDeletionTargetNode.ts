import { Editor, Element, Node } from 'slate';

const getDeletionTargetNode = (
    editor: Editor,
    { reverse, ...options }: Parameters<typeof Editor.before>[2] & { reverse: boolean },
): Node | null => {
    if (!editor.selection) {
        return null;
    }

    // From Slate's TextTransforms.delete
    const targetPoint = reverse
        ? Editor.before(editor, editor.selection, options) || Editor.start(editor, [])
        : Editor.after(editor, editor.selection, options) || Editor.end(editor, []);

    const [[targetNode]] = targetPoint
        ? Editor.nodes(editor, {
              at: targetPoint,
              match: (node) => Element.isElement(node),
          })
        : [];

    return targetNode || null;
};

export default getDeletionTargetNode;
