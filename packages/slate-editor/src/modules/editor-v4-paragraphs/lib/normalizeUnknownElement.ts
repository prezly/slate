import { PARAGRAPH_TYPE } from '@prezly/slate-commons';
import { Editor, Element, Node, NodeEntry, Transforms } from 'slate';

/**
 * If there's an Element node without a `type` attribute - mark it as paragraph.
 */
const normalizeUnknownElement = (editor: Editor, [node, path]: NodeEntry<Node>): boolean => {
    if (!Element.isElement(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    if (typeof node.type === 'undefined') {
        Transforms.setNodes(editor, { type: PARAGRAPH_TYPE }, { at: path });
        return true;
    }

    return false;
};

export default normalizeUnknownElement;
