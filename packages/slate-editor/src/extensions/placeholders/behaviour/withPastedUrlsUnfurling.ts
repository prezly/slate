import type { WithOverrides } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate-common';

import { isUrl } from '#lib';

import { EventsEditor } from '#modules/events';

import { insertPlaceholder } from '../lib';
import { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager } from '../PlaceholdersManager';
import type { FetchOEmbedFn } from '../types';

interface Options {
    isAllowed?: (editor: SlateEditor, url: string) => boolean;
}

/**
 * Automatically link pasted content if it's a URL. // See CARE-3635
 */
export function withPastedUrlsUnfurling(
    fetchOembed: FetchOEmbedFn | undefined,
    { isAllowed = EditorCommands.isSelectionEmpty }: Options = {},
): WithOverrides {
    if (!fetchOembed) {
        return (editor) => editor;
    }

    return (editor) => {
        const { insertData } = editor;

        editor.insertData = (data) => {
            const hasHtml = Boolean(data.getData('text/html'));
            const pasted = data.getData('text');

            if (!hasHtml && isUrl(pasted) && isAllowed(editor, pasted)) {
                editor.withoutNormalizing(() => {
                    const placeholder = insertPlaceholder(editor, {
                        type: PlaceholderNode.Type.EMBED,
                    });
                    PlaceholdersManager.register(
                        placeholder.type,
                        placeholder.uuid,
                        bootstrap(editor, fetchOembed, pasted),
                    );
                    const path = EditorCommands.getNodePath(editor, {
                        at: [],
                        match: PlaceholderNode.isSameAs(placeholder),
                    });
                    if (path) {
                        editor.select(path);
                    }
                });
                return;
            }

            insertData(data);
        };

        return editor;
    };
}

async function bootstrap(editor: SlateEditor, fetchOembed: FetchOEmbedFn, url: string) {
    try {
        const oembed = await fetchOembed(url);
        EventsEditor.dispatchEvent(editor, 'unfurl-pasted-url', { url, oembed });
        return { oembed, url };
    } catch {
        EventsEditor.dispatchEvent(editor, 'unfurl-pasted-url', { url, fallback: 'link' });
        return { url, fallback: 'link' } as const;
    }
}
