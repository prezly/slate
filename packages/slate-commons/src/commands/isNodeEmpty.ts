import { Node } from 'slate';
import { Editor, Text } from 'slate';

export interface IsNodeEmptyOptions {
    shouldTrim?: boolean;
}

export function isNodeEmpty(editor: Editor, node: Node, options?: IsNodeEmptyOptions): boolean {
    if (Text.isText(node)) {
        const text = options?.shouldTrim ? node.text.trim() : node.text;
        return text.length === 0;
    }

    if (Editor.isEditor(node)) {
        return (
            node.children.length <= 1 && node.children.every((child) => isNodeEmpty(editor, child))
        );
    }

    if (options?.shouldTrim) {
        const str = Node.string(node);

        if (str.length && str.trim() === '') {
            return true;
        }
    }

    return Editor.isEmpty(editor, node);
}
