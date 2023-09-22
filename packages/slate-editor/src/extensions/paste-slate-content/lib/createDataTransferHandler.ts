import type { DataTransferHandler } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Transforms } from 'slate';

import { decodeSlateFragment, filterDataTransferItems } from '#lib';

import type { IsPreservedBlock } from '../types';

import { isValidFragment, type Fragment } from './isValidFragment';

export function createDataTransferHandler(
    editor: Editor,
    isPreservedBlock: IsPreservedBlock,
): DataTransferHandler {
    return (dataTransfer, next) => {
        const slateFragment = dataTransfer.getData('application/x-slate-fragment');

        if (slateFragment) {
            const fragment = decodeSlateFragment(slateFragment);

            if (isValidFragment(fragment)) {
                if (handlePastingIntoPreservedBlock(editor, fragment, isPreservedBlock)) {
                    return;
                }

                if (editor.selection) {
                    Transforms.insertFragment(editor, fragment);
                } else {
                    Transforms.insertNodes(editor, fragment);
                }
            } else {
                // Trigger another iteration of pasted content handling,
                // but without the Slate content property.
                // Note: this is not the same as calling `next()`.
                editor.insertData(withoutSlateFragmentData(dataTransfer));
            }
        }

        return next(dataTransfer);
    };
}

function withoutSlateFragmentData(data: DataTransfer): DataTransfer {
    return filterDataTransferItems(data, (item) => item.type !== 'application/x-slate-fragment');
}

function handlePastingIntoPreservedBlock(
    editor: Editor,
    fragment: Fragment,
    isPreservedBlock: IsPreservedBlock,
) {
    const nodesAbove = Editor.nodes(editor, {
        match: (node) => EditorCommands.isBlock(editor, node),
    });
    const [nearestBlock] = Array.from(nodesAbove).at(-1) ?? [];

    if (
        nearestBlock &&
        EditorCommands.isNodeEmpty(editor, nearestBlock) &&
        isPreservedBlock(editor, nearestBlock)
    ) {
        Transforms.insertNodes(editor, fragment, { at: editor.selection?.anchor.path });
        return true;
    }

    return false;
}
