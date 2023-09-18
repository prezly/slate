import { EditorCommands } from '@prezly/slate-commons';
import { isLinkNode } from '@prezly/slate-types';
import { Editor, Transforms } from 'slate';

import { isUrl } from '#lib';

import { autolinkPlaintext, createLink } from '../lib';

/**
 * Automatically link pasted content if it's a URL. // See DEV-11519
 */
export function handlePastedContentAutolinking(editor: Editor, data: DataTransfer): boolean {
    const pasted = data.getData('text');

    const hasHtml = Boolean(data.getData('text/html'));

    if (isUrl(pasted) && EditorCommands.isSelectionEmpty(editor)) {
        const isInsideLink = Array.from(Editor.nodes(editor, { match: isLinkNode })).length > 0;

        if (!isInsideLink) {
            Transforms.insertNodes(editor, createLink({ href: pasted }));
            return true; // handled
        }
    }

    if (!hasHtml) {
        const autolinked = autolinkPlaintext(pasted);
        if (autolinked) {
            Transforms.insertNodes(editor, autolinked);
            return true; // handled;
        }
    }

    return false;
}
