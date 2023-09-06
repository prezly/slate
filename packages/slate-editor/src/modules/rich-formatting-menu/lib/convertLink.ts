import type { OEmbedInfo } from '@prezly/sdk';
import type { BookmarkNode } from '@prezly/slate-types';
import type { VideoNode, LinkNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import type { EmbedNode } from '#extensions/embed';
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

    if (presentation === 'embed') {
        const converted =
            oembed.type === 'video'
                ? createVideoBookmark({ oembed, url: element.href })
                : createEmbed({ oembed, url: element.href });

        Transforms.setNodes<LinkNode | VideoNode | EmbedNode>(editor, converted, {
            match: (node) => node === element,
        });
    } else if (presentation === 'card') {
        const converted = createWebBookmark({ oembed, url: element.href });

        Transforms.setNodes<LinkNode | BookmarkNode>(editor, converted, {
            match: (node) => node === element,
        });
    }
}
