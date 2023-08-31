import type { VideoNode } from '@prezly/slate-types';
import { BookmarkNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { createWebBookmark } from '#extensions/web-bookmark';

import type { Presentation } from '../types';

export function convertVideo(editor: Editor, video: VideoNode, presentation: Presentation) {
    if (presentation === BookmarkNode.TYPE) {
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
