import { EditorCommands } from '@prezly/slate-commons';
import { BookmarkNode } from '@prezly/slate-types';
import type { VideoNode } from '@prezly/slate-types';
import type { Editor, Node } from 'slate';
import { Transforms } from 'slate';

import { humanFriendlyUrl } from '#lib';

import type { EmbedNode } from '#extensions/embed';
import { createEmbed } from '#extensions/embed';
import { createLink } from '#extensions/inline-links';
import { createVideoBookmark } from '#extensions/video';

import type { Presentation } from '../types';

export function convertWebBookmark(
    editor: Editor,
    element: BookmarkNode,
    presentation: Presentation,
) {
    if (presentation === 'embed') {
        const converted =
            element.oembed.type === 'video'
                ? createVideoBookmark({ oembed: element.oembed, url: element.url })
                : createEmbed({ oembed: element.oembed, url: element.url });

        Transforms.setNodes<VideoNode | EmbedNode>(editor, converted, {
            at: [],
            match: (node) => node === element,
        });
    } else if (presentation === 'link') {
        EditorCommands.replaceNode(
            editor,
            {
                at: [],
                match: (node: Node) =>
                    BookmarkNode.isBookmarkNode(node) && node.uuid === element.uuid,
            },
            createLink({
                href: element.url,
                children: [{ text: element.oembed.title ?? humanFriendlyUrl(element.url) }],
            }),
        );
    }
}
