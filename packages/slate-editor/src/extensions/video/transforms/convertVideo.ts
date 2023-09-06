import { EditorCommands } from '@prezly/slate-commons';
import { VideoNode } from '@prezly/slate-types';
import type { BookmarkNode } from '@prezly/slate-types';
import type { Editor, Node } from 'slate';
import { Transforms } from 'slate';

import { humanFriendlyUrl } from '#lib';

import { createLink } from '#extensions/inline-links';
import { createWebBookmark } from '#extensions/web-bookmark';

import type { Presentation } from '../types';

export function convertVideo(editor: Editor, video: VideoNode, presentation: Presentation) {
    if (presentation === 'card') {
        Transforms.setNodes<BookmarkNode>(
            editor,
            createWebBookmark({ oembed: video.oembed, url: video.url }),
            {
                at: [],
                match: (node) => node === video,
            },
        );
    } else if (presentation === 'link') {
        EditorCommands.replaceNode(
            editor,
            {
                at: [],
                match: (node: Node) => VideoNode.isVideoNode(node) && node.uuid === video.uuid,
            },
            createLink({
                href: video.url,
                children: [{ text: video.oembed.title ?? humanFriendlyUrl(video.url) }],
            }),
        );
    }
}
