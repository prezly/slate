import type { OEmbedInfo } from '@prezly/sdk';
import { EditorCommands } from '@prezly/slate-commons';
import type { LinkNode } from '@prezly/slate-types';
import type { Editor, Node } from 'slate';

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

    function convert(oembed: OEmbedInfo) {
        if (presentation === 'card') {
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
            at: [],
            match: (node: Node) => node === element,
            select: true,
        });
    }
}
