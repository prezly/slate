import { EditorCommands } from '@prezly/slate-commons';
import { isLinkNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

import { isUrl } from '#lib';

import { autolinkPlaintext, createLink } from '../lib';

/**
 * Automatically link pasted content if it's a URL. // See DEV-11519
 */
export function withPastedContentAutolinking<T extends SlateEditor>(editor: T): T {
    const { insertData } = editor;

    editor.insertData = (data) => {
        const pasted = data.getData('text');

        const hasHtml = Boolean(data.getData('text/html'));

        if (isUrl(pasted) && EditorCommands.isSelectionEmpty(editor)) {
            const isInsideLink = Array.from(editor.api.nodes({ match: isLinkNode })).length > 0;

            if (!isInsideLink) {
                editor.tf.insertNodes(createLink({ href: pasted }));
                return;
            }
        }

        if (!hasHtml) {
            const autolinked = autolinkPlaintext(pasted);
            if (autolinked) {
                editor.tf.insertNodes(autolinked);
                return;
            }
        }

        insertData(data);
    };

    return editor;
}
