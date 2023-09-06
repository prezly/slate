import { EditorCommands } from '@prezly/slate-commons';
import { VideoNode } from '@prezly/slate-types';
import type { Editor, Node } from 'slate';

import { humanFriendlyUrl } from '#lib';

import { createLink } from '#extensions/inline-links';
import { createWebBookmark } from '#extensions/web-bookmark';

import type { Presentation } from '../types';

export function convertVideo(editor: Editor, video: VideoNode, presentation: Presentation) {
    if (presentation === 'card') {
        EditorCommands.replaceNode(
            editor,
            {
                at: [],
                match: (node) => node === video,
                select: true,
            },
            createWebBookmark({ oembed: video.oembed, url: video.url }),
        );
    } else if (presentation === 'link') {
        EditorCommands.replaceNode(
            editor,
            {
                at: [],
                match: (node: Node) => VideoNode.isVideoNode(node) && node.uuid === video.uuid,
                select: true,
            },
            createLink({
                href: video.url,
                children: [{ text: video.oembed.title ?? humanFriendlyUrl(video.url) }],
            }),
        );
    }
}
