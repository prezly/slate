import type { Location, NodeEntry, Range } from 'slate';
import { Editor, Node, Path } from 'slate';

import type { TablesEditor } from '../TablesEditor';

export function withTablesCopyPasteBehavior<T extends TablesEditor>(editor: T): T {
    const { getFragment } = editor;

    editor.getFragment = () => {
        if (editor.selection) {
            const cellEntry = findParentCell(editor, editor.selection);

            if (cellEntry && isRangeInsideCell(editor.selection, cellEntry)) {
                const [cell, cellPath] = cellEntry;
                const { focus, anchor } = editor.selection;

                return Node.fragment(cell, {
                    anchor: {
                        offset: anchor.offset,
                        path: Path.relative(anchor.path, cellPath),
                    },
                    focus: {
                        offset: focus.offset,
                        path: Path.relative(focus.path, cellPath),
                    },
                });
            }
        }

        return getFragment();
    };

    return editor;
}

function isRangeInsideCell(selection: Range, [, cellPath]: NodeEntry<Node>) {
    return (
        Path.isCommon(cellPath, selection.anchor.path) &&
        Path.isCommon(cellPath, selection.focus.path)
    );
}

function findParentCell(editor: TablesEditor, at: Location) {
    for (const entry of Editor.levels(editor, { at })) {
        if (editor.isTableCellNode(entry[0])) {
            return entry;
        }
    }

    return undefined;
}
