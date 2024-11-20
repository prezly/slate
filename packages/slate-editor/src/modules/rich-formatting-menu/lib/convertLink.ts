import { EditorCommands } from '@prezly/slate-commons';
import type { LinkNode } from '@prezly/slate-types';
import { getNode, type SlateEditor } from '@udecode/plate-common';
import { Node, Path } from 'slate';

import { createPlaceholder, PlaceholderNode, PlaceholdersManager } from '#extensions/placeholders';

import type { FetchOEmbedFn, Presentation } from '../types';

export function convertLink(
    editor: SlateEditor,
    element: LinkNode,
    presentation: Presentation,
    fetchOembed: FetchOEmbedFn,
) {
    const replacementPath = determineReplacementPath(editor, element);
    if (!replacementPath) {
        return;
    }

    const type =
        presentation === 'embed' ? PlaceholderNode.Type.EMBED : PlaceholderNode.Type.WEB_BOOKMARK;

    const placeholder = createPlaceholder({ type });

    PlaceholdersManager.register(
        placeholder.type,
        placeholder.uuid,
        bootstrap(element.href, fetchOembed),
    );

    EditorCommands.replaceNode(editor, placeholder, {
        at: replacementPath,
        match: (_, path) => Path.equals(path, replacementPath),
        select: true,
    });
}

function determineReplacementPath(editor: SlateEditor, link: LinkNode) {
    const path = EditorCommands.getNodePath(editor, {
        match: (node) => node === link,
    });

    if (path && path.length > 1) {
        const parentPath = Path.parent(path);
        const parent = getNode(editor, parentPath);

        if (parent?.string === Node.string(link)) {
            return parentPath;
        }
    }

    return path;
}

async function bootstrap(url: string, fetchOembed: FetchOEmbedFn) {
    try {
        const oembed = await fetchOembed(url);
        return { oembed, url };
    } catch {
        return { url, fallback: 'link' } as const;
    }
}
