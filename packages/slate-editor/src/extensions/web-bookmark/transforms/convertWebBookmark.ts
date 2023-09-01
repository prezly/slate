import type { BookmarkNode, VideoNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import type { EmbedNode } from '#extensions/embed';
import { createEmbed } from '#extensions/embed';
import { createVideoBookmark } from '#extensions/video';

import type { Presentation } from '../types';

export function convertWebBookmark(
    editor: Editor,
    element: BookmarkNode,
    presentation: Presentation,
) {
    if (presentation === 'embed') {
        const converted =
            element.oembed.type === 'video'
                ? createVideoBookmark({ oembed: element.oembed, url: element.url })
                : createEmbed({ oembed: element.oembed, url: element.url });

        Transforms.setNodes<VideoNode | EmbedNode>(editor, converted, {
            at: [],
            match: (node) => node === element,
        });
    }
}
