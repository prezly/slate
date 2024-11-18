import { EditorCommands } from '@prezly/slate-commons';
import {
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    isElementNode,
    PARAGRAPH_NODE_TYPE,
    QUOTE_NODE_TYPE,
} from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

import { isUrl, normalizeHref } from '#lib';

import { unwrapLink, wrapInLink } from '../lib';

/**
 * Automatically link selected text if the pasted content is a URL.
 */
export function withSelectionAutolinking<T extends SlateEditor>(editor: T): T {
    const { insertData } = editor;

    editor.insertData = (data) => {
        const href = data.getData('text');

        if (isUrl(href) && !EditorCommands.isSelectionEmpty(editor)) {
            const nodes = Array.from(
                editor.nodes({ match: isElementNode, mode: 'highest' }),
            );

            const isOnlyAllowedNodes = nodes.every(([node]) =>
                isElementNode(node, [
                    PARAGRAPH_NODE_TYPE,
                    QUOTE_NODE_TYPE,
                    HEADING_1_NODE_TYPE,
                    HEADING_2_NODE_TYPE,
                ]),
            );

            if (isOnlyAllowedNodes) {
                // Unwrap any links in the current selection, otherwise multiple links
                // would overlap
                unwrapLink(editor);
                wrapInLink(editor, { href: normalizeHref(href), new_tab: true });
                return;
            }
        }

        insertData(data);
    };

    return editor;
}
