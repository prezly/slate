import type { OEmbedInfo } from '@prezly/sdk';
import { EditorCommands } from '@prezly/slate-commons';
import type { LinkNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Node, Path } from 'slate';

import { createEmbed } from '#extensions/embed';
import { createVideoBookmark } from '#extensions/video';
import { createWebBookmark } from '#extensions/web-bookmark';
import { EventsEditor } from '#modules/events';

import type { FetchOEmbedFn, Presentation } from '../types';

export async function convertLink(
    editor: Editor,
    element: LinkNode,
    presentation: Presentation,
    fetchOembed: FetchOEmbedFn,
) {
    let oembed: OEmbedInfo | undefined = undefined;
    try {
        oembed = await fetchOembed(element.href);
    } catch (error) {
        EventsEditor.dispatchEvent(editor, 'error', error);
        return;
    }

    const replacementPath = determineReplacementPath(editor, element);
    if (!replacementPath) {
        return;
    }

    function convert(oembed: OEmbedInfo) {
        if (presentation === 'card' || (presentation === 'embed' && oembed.type === 'link')) {
            return createWebBookmark({ oembed, url: element.href });
        }
        if (presentation === 'embed' && oembed.type === 'video') {
            return createVideoBookmark({ oembed, url: element.href });
        }
        if (presentation === 'embed') {
            return createEmbed({ oembed, url: element.href });
        }
        return undefined;
    }

    const converted = convert(oembed);

    if (converted) {
        EditorCommands.replaceNode(editor, converted, {
            at: replacementPath,
            match: (_, path) => Path.equals(path, replacementPath),
            select: true,
        });
    }
}

function determineReplacementPath(editor: Editor, link: LinkNode) {
    const path = EditorCommands.getNodePath(editor, {
        match: (node) => node === link,
    });

    if (path && path.length > 1) {
        const parentPath = Path.parent(path);
        const parent = Node.get(editor, parentPath);

        if (Node.string(parent) === Node.string(link)) {
            return parentPath;
        }
    }

    return path;
}
