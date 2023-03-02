import { EditorCommands } from '@prezly/slate-commons';
import type { Node } from 'slate';
import { Editor, Transforms } from 'slate';

import { createDataTransfer, decodeSlateFragment } from '#lib';

import type { Fragment as SlateFragment } from './isFragment';
import { isFragment as isValidFragment } from './isFragment';

export type IsPreservedBlock = (editor: Editor, node: Node) => boolean;

export function withSlatePasting(isPreservedBlock: IsPreservedBlock) {
    return function <T extends Editor>(editor: T) {
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
                        Transforms.insertFragment(editor, fragment);
                    } else {
                        Transforms.insertNodes(editor, fragment);
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

function withoutSlateFragmentData(data: DataTransfer): DataTransfer {
    const types = data.types.filter((type) => type !== 'application/x-slate-fragment');
    const dataMap = Object.fromEntries(types.map((type) => [type, data.getData(type)]));
    return createDataTransfer(dataMap);
}

function handlePastingIntoPreservedBlock(
    editor: Editor,
    fragment: SlateFragment,
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
