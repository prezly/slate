import type { WithOverrides } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Transforms } from 'slate';

import { isUrl } from '#lib';

import { insertPlaceholder } from '../lib';
import { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager } from '../PlaceholdersManager';
import type { FetchOEmbedFn } from '../types';

/**
 * Automatically link pasted content if it's a URL. // See DEV-11519
 */
export function withUnfurlingPastedUrls(fetchOembed: FetchOEmbedFn | undefined): WithOverrides {
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
                        bootstrap(fetchOembed, pasted),
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

async function bootstrap(fetchOembed: FetchOEmbedFn, url: string) {
    try {
        const oembed = await fetchOembed(url);
        return { oembed, url };
    } catch {
        return { url };
    }
}
