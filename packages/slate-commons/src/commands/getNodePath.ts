import type { Path } from 'slate';
import { Editor } from 'slate';

const getNodePath = (
    editor: Editor,
    options: NonNullable<Parameters<typeof Editor.nodes>[1]>,
): Path | null => {
    const [matchedNodeEntry] = Editor.nodes(editor, options);
    return matchedNodeEntry ? matchedNodeEntry[1] : null;
};

export default getNodePath;
