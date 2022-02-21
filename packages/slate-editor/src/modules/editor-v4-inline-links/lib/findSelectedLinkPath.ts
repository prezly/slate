import { isLinkNode } from '@prezly/slate-types';
import type { Path } from 'slate';
import { Editor } from 'slate';

export function findSelectedLinkPath(editor: Editor): Path | null {
    if (!editor.selection) {
        return null;
    }

    const [linkEntry] = Array.from(
        Editor.nodes(editor, {
            match: (node) => isLinkNode(node),
            at: editor.selection,
        }),
    );

    if (!linkEntry) {
        return null;
    }

    const [, path] = linkEntry;
    return path;
}
