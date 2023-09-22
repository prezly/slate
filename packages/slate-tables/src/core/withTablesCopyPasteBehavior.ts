import { type Range, Node, Path, Editor } from 'slate';

import { findParentCell } from '../queries';
import type { TablesEditor } from '../TablesEditor';

export function getFragment(
    editor: TablesEditor,
    next: Editor['getFragment'],
): ReturnType<Editor['getFragment']> {
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
    }

    return next();
}

export function withTablesCopyPasteBehavior<T extends TablesEditor>(editor: T): T {
    const parent = {
        getFragment: editor.getFragment,
    };

    editor.getFragment = () => {
        return getFragment(editor, parent.getFragment);
    };

    return editor;
}

function isRangeInside(selection: Range, path: Path) {
    return Path.isCommon(path, selection.anchor.path) && Path.isCommon(path, selection.focus.path);
}
