import type { BookmarkNode } from '@prezly/slate-types';
import { VideoNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { createWebBookmark } from '#extensions/web-bookmark';

export function convertVideo(
    editor: Editor,
    video: VideoNode,
    presentation: `${VideoNode.Presentation}`,
) {
    if (presentation === VideoNode.Presentation.BOOKMARK) {
        Transforms.setNodes<BookmarkNode>(
            editor,
            createWebBookmark({ oembed: video.oembed, url: video.url }),
            {
                at: [],
                match: (node) => node === video,
            },
        );
    }
}
