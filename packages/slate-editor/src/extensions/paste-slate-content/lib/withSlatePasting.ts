import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Transforms } from 'slate';

import { createDataTransfer, decodeSlateFragment } from '#lib';

import type { Fragment as SlateFragment } from './isFragment';
import { isFragment as isValidFragment } from './isFragment';

export function withSlatePasting<T extends Editor>(editor: T) {
    const { insertData } = editor;

    editor.insertData = (data) => {
        const slateFragment = data.getData('application/x-slate-fragment');

        if (slateFragment) {
            const fragment = decodeSlateFragment(slateFragment);

            if (isValidFragment(fragment)) {
                if (handlePastingIntoRichBlock(editor, fragment)) {
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
}

function withoutSlateFragmentData(data: DataTransfer): DataTransfer {
    const types = data.types.filter((type) => type !== 'application/x-slate-fragment');
    const dataMap = Object.fromEntries(types.map((type) => [type, data.getData(type)]));
    return createDataTransfer(dataMap);
}

function handlePastingIntoRichBlock(editor: Editor, fragment: SlateFragment) {
    const nodesAbove = Editor.nodes(editor, { match: (node) => Editor.isBlock(editor, node) });
    const [nearestBlock] = Array.from(nodesAbove).at(-1) ?? [];

    if (
        nearestBlock &&
        editor.isRichBlock(nearestBlock) &&
        EditorCommands.isNodeEmpty(editor, nearestBlock)
    ) {
        Transforms.insertNodes(editor, fragment, { at: editor.selection?.anchor.path });
        return true;
    }

    return false;
}
