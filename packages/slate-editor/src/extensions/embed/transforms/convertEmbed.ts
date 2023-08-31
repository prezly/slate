import type { BookmarkNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { createWebBookmark } from '#extensions/web-bookmark';

import { EmbedNode } from '../EmbedNode';

export function convertEmbed(
    editor: Editor,
    element: EmbedNode,
    presentation: `${EmbedNode.Presentation}`,
) {
    if (presentation === EmbedNode.Presentation.BOOKMARK) {
        Transforms.setNodes<BookmarkNode>(
            editor,
            createWebBookmark({ oembed: element.oembed, url: element.url }),
            {
                at: [],
                match: (node) => node === element,
            },
        );
    }
}
