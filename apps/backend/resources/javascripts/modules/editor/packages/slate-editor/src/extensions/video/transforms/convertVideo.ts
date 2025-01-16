import { EditorCommands } from '@prezly/slate-commons';
import type { VideoNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

import { humanFriendlyUrl } from '#lib';

import { createLink } from '#extensions/inline-links';
import { createWebBookmark } from '#extensions/web-bookmark';

import type { Presentation } from '../types';

export function convertVideo(editor: SlateEditor, video: VideoNode, presentation: Presentation) {
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
        EditorCommands.replaceNode(editor, converted, {
            at: [],
            match: (node) => node === video,
            select: true,
        });
    }
}
