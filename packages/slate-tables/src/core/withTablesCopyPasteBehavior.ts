import { type Range, Node, Path } from 'slate';

import { findParentCell, findParentTable } from '../queries';
import type { TablesEditor } from '../TablesEditor';

export function withTablesCopyPasteBehavior<T extends TablesEditor>(editor: T): T {
    const { getFragment } = editor;

    editor.getFragment = () => {
        if (editor.selection) {
            const cellEntry = findParentCell(editor);

            if (cellEntry && isRangeInside(editor.selection, cellEntry[1])) {
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

            const tableEntry = findParentTable(editor);

            if (tableEntry && isRangeInside(editor.selection, tableEntry[1])) {
                return [tableEntry[0]];
            }
        }

        return getFragment();
    };

    return editor;
}

function isRangeInside(selection: Range, path: Path) {
    return Path.isCommon(path, selection.anchor.path) && Path.isCommon(path, selection.focus.path);
}
