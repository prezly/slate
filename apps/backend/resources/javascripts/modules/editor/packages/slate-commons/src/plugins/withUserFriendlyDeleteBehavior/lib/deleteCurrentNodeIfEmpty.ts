import { isElementNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

import { getCurrentNodeEntry, isNodeEmpty } from '../../../commands';

import { getDeletionTargetNode } from './getDeletionTargetNode';

interface Parameters {
    reverse: boolean;
    unit: 'character' | 'word' | 'line' | 'block';
}

export function deleteCurrentNodeIfEmpty(
    editor: SlateEditor,
    { reverse, unit }: Parameters,
): boolean {
    const [currentNode] = getCurrentNodeEntry(editor) || [];
    const targetNode = getDeletionTargetNode(editor, { reverse, unit });

    /**
     * There's a bug with Slate (as far as we know) which makes it delete the
     * current empty block (e.g. empty paragraph) and the block before.
     *
     * Example for backspace: add a divider, press enter, then backspace.
     * The expected behavior that only the newly added empty paragraph is removed,
     * but the editor also removes the divider node above it.
     * Reported here: https://github.com/prezly/prezly/pull/8239#discussion_r459898533
     *
     * Example for delete: add a divider, create an empty paragraph above, press delete.
     * The expected behavior that only the empty paragraph is removed,
     * but the editor also removes the divider node above it.
     * Reported here: https://github.com/prezly/prezly/pull/8306#discussion_r469086158
     *
     * The fix here is to check if the target node is of different type and remove the current node
     * instead of performing the default `deleteBackward` or `deleteForward`.
     */
    if (
        isElementNode(currentNode) &&
        isElementNode(targetNode) &&
        currentNode.type !== targetNode.type &&
        isNodeEmpty(editor, currentNode)
    ) {
        editor.removeNodes({
            match: (node) => {
                return isElementNode(node, currentNode.type);
            },
        });
        return true;
    }

    return false;
}
