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

                const rangeRelativeToCell: Range = {
                    anchor: {
                        offset: editor.selection.anchor.offset,
                        path: Path.relative(editor.selection.anchor.path, cellPath),
                    },
                    focus: {
                        offset: editor.selection.focus.offset,
                        path: Path.relative(editor.selection.focus.path, cellPath),
                    },
                };

                return Node.fragment(cell, rangeRelativeToCell);
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
