import { EditorCommands } from '@prezly/slate-commons';
import type { Node, SlateEditor } from '@udecode/plate';

import { decodeSlateFragment, filterDataTransferItems } from '#lib';

import type { Fragment as SlateFragment } from './isFragment';
import { isFragment as isValidFragment } from './isFragment';

export type IsPreservedBlock = (editor: SlateEditor, node: Node) => boolean;

export function withSlatePasting(isPreservedBlock: IsPreservedBlock) {
    return function <T extends SlateEditor>(editor: T) {
        const { insertData } = editor;

        editor.insertData = (data) => {
            const slateFragment = data.getData('application/x-slate-fragment');

            if (slateFragment) {
                const fragment = decodeSlateFragment(slateFragment);

                if (isValidFragment(fragment)) {
                    if (handlePastingIntoPreservedBlock(editor, fragment, isPreservedBlock)) {
                        return;
                    }

                    if (editor.selection) {
                        editor.insertFragment(fragment);
                    } else {
                        editor.insertNodes(fragment);
                    }
                } else {
                    editor.insertData(withoutSlateFragmentData(data));
                }

                return;
            }

            insertData(data);
        };

        return editor;
    };
}

function withoutSlateFragmentData(dataTransfer: DataTransfer): DataTransfer {
    return filterDataTransferItems(
        dataTransfer,
        (item) => item.type !== 'application/x-slate-fragment',
    );
}

function handlePastingIntoPreservedBlock(
    editor: SlateEditor,
    fragment: SlateFragment,
    isPreservedBlock: IsPreservedBlock,
) {
    const nodesAbove = editor.api.nodes({
        match: (node) => EditorCommands.isBlock(editor, node),
    });
    const [nearestBlock] = Array.from(nodesAbove).at(-1) ?? [];

    if (
        nearestBlock &&
        EditorCommands.isNodeEmpty(editor, nearestBlock) &&
        isPreservedBlock(editor, nearestBlock)
    ) {
        editor.tf.insertNodes(fragment, { at: editor.selection?.anchor.path });
        return true;
    }

    return false;
}
