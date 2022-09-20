import { isElementNode, PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';
import { type Editor, type NodeEntry, Transforms } from 'slate';

/**
 * @deprecated
 */
const VARIABLE_NODE_TYPE = 'variable';

export function convertVariableNodesToPlaceholders(editor: Editor, [node, path]: NodeEntry) {
    if (isElementNode(node, VARIABLE_NODE_TYPE)) {
        Transforms.setNodes(editor, { type: PLACEHOLDER_NODE_TYPE }, { at: path });
        return true;
    }

    return false;
}
