import type { Editor, Path } from 'slate';
import { Node, Text } from 'slate';

const findLeafPath = (editor: Editor, path: Path): Path | null => {
    if (!Node.has(editor, path)) {
        return null;
    }

    const node = Node.get(editor, path);

    if (Text.isText(node)) {
        return path;
    }

    return findLeafPath(editor, [...path, 0]);
};

export default findLeafPath;
