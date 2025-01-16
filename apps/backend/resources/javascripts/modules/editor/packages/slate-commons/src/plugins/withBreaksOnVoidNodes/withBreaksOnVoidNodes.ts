/* eslint-disable no-param-reassign */
import type { SlateEditor } from '@udecode/plate-common';

import { getCurrentNodeEntry, insertEmptyParagraph, isVoid } from '../../commands';

export function withBreaksOnVoidNodes<T extends SlateEditor>(editor: T): T {
    const { insertBreak } = editor;

    editor.insertBreak = () => {
        const [currentNode] = getCurrentNodeEntry(editor) || [];

        if (currentNode && isVoid(editor, currentNode)) {
            /**
             * When trying to insert a break (press Enter) on a void node, the break is not inserted.
             * Reported here: https://github.com/prezly/prezly/pull/8239#discussion_r460073101
             *
             * As far as we know, this is a bug in Slate, because it was also happening on the
             * official images example at https://www.slatejs.org/examples/images.
             * The fix is to override the behavior and manually insert an empty paragraph.
             */
            insertEmptyParagraph(editor);
            return;
        }

        insertBreak();
    };

    return editor;
}
