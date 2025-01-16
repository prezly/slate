import { isElementNode, VARIABLE_NODE_TYPE } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

/**
 * @deprecated
 */
const PLACEHOLDER_NODE_TYPE = 'placeholder';

export function convertLegacyPlaceholderNodesToVariables(
    editor: SlateEditor,
    [node, path]: NodeEntry,
) {
    if (isElementNode(node, PLACEHOLDER_NODE_TYPE)) {
        editor.tf.setNodes({ type: VARIABLE_NODE_TYPE }, { at: path });
        return true;
    }

    return false;
}
