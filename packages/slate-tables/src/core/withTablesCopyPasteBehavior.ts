import { type NodeEntry, type Range, Node, Path } from 'slate';

import { findParentCell } from '../queries';
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
