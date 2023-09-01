import type { BookmarkNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import type { EmbedNode } from '#extensions/embed';
import { createEmbed } from '#extensions/embed';

import type { Presentation } from '../types';

export function convertWebBookmark(
    editor: Editor,
    element: BookmarkNode,
    presentation: Presentation,
) {
    if (presentation === 'embed') {
        Transforms.setNodes<EmbedNode>(
            editor,
            createEmbed({ oembed: element.oembed, url: element.url }),
            {
                at: [],
                match: (node) => node === element,
            },
        );
    }
}
