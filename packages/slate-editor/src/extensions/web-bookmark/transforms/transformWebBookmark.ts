import type { BookmarkNode } from '@prezly/slate-types';
import { VideoNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import type { EmbedNode } from '#extensions/embed';
import { createEmbed } from '#extensions/embed';

export function transformWebBookmark(
    editor: Editor,
    element: BookmarkNode,
    presentation: `${VideoNode.Presentation}`,
) {
    if (presentation === VideoNode.Presentation.EMBED) {
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
