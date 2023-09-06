import { EditorCommands } from '@prezly/slate-commons';
import type { VideoNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

import { humanFriendlyUrl } from '#lib';

import { createLink } from '#extensions/inline-links';
import { createWebBookmark } from '#extensions/web-bookmark';

import type { Presentation } from '../types';

export function convertVideo(editor: Editor, video: VideoNode, presentation: Presentation) {
    function convert() {
        if (presentation === 'card') {
            return createWebBookmark({ oembed: video.oembed, url: video.url });
        }
        if (presentation === 'link') {
            return createLink({
                href: video.url,
                children: [{ text: video.oembed.title ?? humanFriendlyUrl(video.url) }],
            });
        }
        return undefined;
    }

    const converted = convert();

    if (converted) {
        EditorCommands.replaceNode(
            editor,
            {
                at: [],
                match: (node) => node === video,
                select: true,
            },
            converted,
        );
    }
}
