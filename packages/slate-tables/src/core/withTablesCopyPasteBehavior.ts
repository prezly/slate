import type { Location, Range } from 'slate';
import { Editor, Node, Path } from 'slate';

import type { TablesEditor } from '../TablesEditor';

export function withTablesCopyPasteBehavior<T extends TablesEditor>(editor: T): T {
    const { getFragment } = editor;

    editor.getFragment = () => {
        if (editor.selection) {
            const cellEntry = findNearestCell(editor, editor.selection);

            if (cellEntry) {
                const [cell, cellPath] = cellEntry;
                const isRangeInsideCell =
                    Path.isCommon(cellPath, editor.selection.anchor.path) &&
                    Path.isCommon(cellPath, editor.selection.focus.path);

                if (isRangeInsideCell) {
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
        }

        return getFragment();
    };

    return editor;
}

function findNearestCell(editor: TablesEditor, at: Location) {
    for (const entry of Editor.levels(editor, { at })) {
        if (editor.isTableCellNode(entry[0])) {
            return entry;
        }
    }

    return undefined;
}
