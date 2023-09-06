import { EditorCommands } from '@prezly/slate-commons';
import { BookmarkNode } from '@prezly/slate-types';
import type { Editor, Node } from 'slate';

import { humanFriendlyUrl } from '#lib';

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

        EditorCommands.replaceNode(
            editor,
            {
                at: [],
                match: (node) => node === element,
                select: true,
            },
            converted,
        );
    } else if (presentation === 'link') {
        EditorCommands.replaceNode(
            editor,
            {
                at: [],
                match: (node: Node) =>
                    BookmarkNode.isBookmarkNode(node) && node.uuid === element.uuid,
                select: true,
            },
            createLink({
                href: element.url,
                children: [{ text: element.oembed.title ?? humanFriendlyUrl(element.url) }],
            }),
        );
    }
}
