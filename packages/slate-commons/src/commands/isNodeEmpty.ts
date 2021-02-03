import { Editor, Node, Text } from 'slate';

const isNodeEmpty = (editor: Editor, node: Node): boolean => {
    if (Text.isText(node)) {
        return node.text.length === 0;
    }

    return Editor.isEmpty(editor, node);
};

export default isNodeEmpty;
