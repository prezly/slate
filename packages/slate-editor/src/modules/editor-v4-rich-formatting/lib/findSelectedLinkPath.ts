import { Editor, Path } from 'slate';

import isLinkElement from './isLinkElement';

const findSelectedLinkPath = (editor: Editor): Path | null => {
    if (!editor.selection) {
        return null;
    }

    const [linkEntry] = Array.from(
        Editor.nodes(editor, {
            match: (node) => isLinkElement(node),
            at: editor.selection,
        }),
    );

    if (!linkEntry) {
        return null;
    }

    const [, path] = linkEntry;
    return path;
};

export default findSelectedLinkPath;
