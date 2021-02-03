import { Node } from 'slate';
import { ReactEditor } from 'slate-react';

/**
 * Type-safe wrapper for `ReactEditor.toDOMNode`
 */
const toDomNode = (editor: ReactEditor, node: Node): HTMLElement | null => {
    try {
        // "Slate throws exceptions too liberally in relation to selection failures"
        // see: https://app.clubhouse.io/prezly/story/20456/error-cannot-resolve-a-dom-node-from-slate-node-text
        // see: https://github.com/ianstormtaylor/slate/issues/3641
        return ReactEditor.toDOMNode(editor, node);
    } catch {
        return null;
    }
};

export default toDomNode;
