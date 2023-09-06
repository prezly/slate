import { EditorCommands } from '@prezly/slate-commons';
import { isLinkNode } from '@prezly/slate-types';
import { Editor, Transforms } from 'slate';

import { autolinkPlaintext, createLink, isUrl } from '../lib';

/**
 * Automatically link pasted content if it's a URL. // See DEV-11519
 */
export function withPastedContentAutolinking<T extends Editor>(editor: T): T {
    const { insertData } = editor;

    editor.insertData = (data) => {
        const pasted = data.getData('text');

        const hasHtml = Boolean(data.getData('text/html'));

        if (isUrl(pasted) && EditorCommands.isSelectionEmpty(editor)) {
            const isInsideLink = Array.from(Editor.nodes(editor, { match: isLinkNode })).length > 0;

            if (!isInsideLink) {
                Transforms.insertNodes(editor, createLink({ href: pasted }));
                return;
            }
        }

        if (!hasHtml) {
            const autolinked = autolinkPlaintext(pasted);
            if (autolinked) {
                Transforms.insertNodes(editor, autolinked);
                return;
            }
        }

        insertData(data);
    };

    return editor;
}
