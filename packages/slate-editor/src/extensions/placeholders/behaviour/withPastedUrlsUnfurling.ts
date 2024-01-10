import type { WithOverrides } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Transforms } from 'slate';

import { isUrl } from '#lib';

import { EventsEditor } from '#modules/events';

import { insertPlaceholder } from '../lib';
import { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager } from '../PlaceholdersManager';
import type { FetchOEmbedFn } from '../types';

/**
 * Automatically link pasted content if it's a URL. // See DEV-11519
 */
export function withPastedUrlsUnfurling(fetchOembed: FetchOEmbedFn | undefined): WithOverrides {
    if (!fetchOembed) {
        return (editor) => editor;
    }

    return (editor) => {
        const { insertData } = editor;

        editor.insertData = (data) => {
            const hasHtml = Boolean(data.getData('text/html'));
            const pasted = data.getData('text');

            if (!hasHtml && isUrl(pasted) && EditorCommands.isSelectionEmpty(editor)) {
                Editor.withoutNormalizing(editor, () => {
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
                        Transforms.select(editor, path);
                    }
                });
                return;
            }

            insertData(data);
        };

        return editor;
    };
}

async function bootstrap(editor: Editor, fetchOembed: FetchOEmbedFn, url: string) {
    try {
        const oembed = await fetchOembed(url);
        EventsEditor.dispatchEvent(editor, 'unfurl-pasted-url', { url, oembed });
        return { oembed, url };
    } catch {
        EventsEditor.dispatchEvent(editor, 'unfurl-pasted-url', { url, fallback: 'link' });
        return { url, fallback: 'link' } as const;
    }
}
