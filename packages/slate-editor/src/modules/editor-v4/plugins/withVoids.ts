/* eslint-disable no-param-reassign */

import { EditorCommands, nodeIdManager } from '@prezly/slate-commons';
import { Editor, Range, Transforms } from 'slate';

const withVoids = <T extends Editor>(editor: T) => {
    const { normalizeNode } = editor;

    /*
     * Originally `editor.deleteFragment` does 2 things:
     *    - it checks if `editor.selection` is not `null` and if it is expanded
     *    - if it is, then it calls `Transforms.delete(editor)`
     * The problem is that:
     *     - `Transforms.delete(editor)` does not delete void nodes.
     *     - `Transforms.delete(editor, { voids: true })` does not behave as expected when
     *       void node is at the start or end of an expanded selection.
     * That's why we have a custom implementation of it.
     * see: https://github.com/ianstormtaylor/slate/issues/3868#issuecomment-694268142
     */
    editor.deleteFragment = () => {
        if (!editor.selection || Range.isCollapsed(editor.selection)) {
            return;
        }

        const selectedVoids = Array.from(
            Editor.nodes(editor, {
                match: (node) => Editor.isVoid(editor, node),
            }),
        );

        const selectedVoidsIds = selectedVoids.map((voidEntry) => {
            return nodeIdManager.assign(editor, voidEntry);
        });

        Transforms.delete(editor, { hanging: true });

        selectedVoidsIds.forEach((id) => {
            const voidEntry = nodeIdManager.get(editor, id);
            nodeIdManager.unassign(editor, id);

            if (!voidEntry) {
                return;
            }

            const [, voidEntryPath] = voidEntry;
            Transforms.removeNodes(editor, { at: voidEntryPath, voids: true });
        });
    };

    editor.normalizeNode = (entry) => {
        const [node] = entry;

        if (Editor.isVoid(editor, node)) {
            // When copy-pasting void blocks, pasted nodes will have redundant `Text` children
            // which breaks comparison of editor value. We want void elements to only
            // have a single, empty `Text` child (they're void elements) - hence normalization.
            // The text rendered in those elements is righteously copied to clipboard though,
            // so that it can be pasted into other places (i.e. not Prezly editor).
            const normalized = EditorCommands.removeChildren(editor, entry);

            if (normalized) {
                return;
            }
        }

        normalizeNode(entry);
    };

    return editor;
};

export default withVoids;
