import { NodeApi, type Path, PathApi, type Range } from '@udecode/plate';

import { findParentCell } from '../queries';
import type { TablesEditor } from '../TablesEditor';

export function withTablesCopyPasteBehavior<T extends TablesEditor>(editor: T): T {
    const { getFragment } = editor;

    editor.getFragment = () => {
        if (editor.selection) {
            const cellEntry = findParentCell(editor);

            if (cellEntry && isRangeInside(editor.selection, cellEntry[1])) {
                const [cell, cellPath] = cellEntry;
                const { focus, anchor } = editor.selection;

                return NodeApi.fragment(cell, {
                    anchor: {
                        offset: anchor.offset,
                        path: PathApi.relative(anchor.path, cellPath),
                    },
                    focus: {
                        offset: focus.offset,
                        path: PathApi.relative(focus.path, cellPath),
                    },
                });
            }
        }

        return getFragment();
    };

    return editor;
}

function isRangeInside(selection: Range, path: Path) {
    return (
        PathApi.isCommon(path, selection.anchor.path) &&
        PathApi.isCommon(path, selection.focus.path)
    );
}
