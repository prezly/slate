import { isElementNode, VARIABLE_NODE_TYPE } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import { type NodeEntry } from 'slate';

/**
 * @deprecated
 */
const PLACEHOLDER_NODE_TYPE = 'placeholder';

export function convertLegacyPlaceholderNodesToVariables(editor: SlateEditor, [node, path]: NodeEntry) {
    if (isElementNode(node, PLACEHOLDER_NODE_TYPE)) {
        editor.setNodes({ type: VARIABLE_NODE_TYPE }, { at: path });
        return true;
    }

    return false;
}
