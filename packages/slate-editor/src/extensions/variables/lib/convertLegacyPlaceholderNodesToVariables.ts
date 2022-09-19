import { isElementNode, VARIABLE_NODE_TYPE } from '@prezly/slate-types';
import { type Editor, type NodeEntry, Transforms } from 'slate';

/**
 * @deprecated
 */
const PLACEHOLDER_NODE_TYPE = 'placeholder';

export function convertLegacyPlaceholderNodesToVariables(editor: Editor, [node, path]: NodeEntry) {
    if (isElementNode(node, PLACEHOLDER_NODE_TYPE)) {
        Transforms.setNodes(editor, { type: VARIABLE_NODE_TYPE }, { at: path });
        return true;
    }

    return false;
}
