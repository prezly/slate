import type { BookmarkNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { createWebBookmark } from '#extensions/web-bookmark';

import type { EmbedNode } from '../EmbedNode';
import type { Presentation } from '../types';

export function convertEmbed(editor: Editor, element: EmbedNode, presentation: Presentation) {
    if (presentation === 'card') {
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
