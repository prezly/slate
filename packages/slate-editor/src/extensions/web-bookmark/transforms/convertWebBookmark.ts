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
    function convert() {
        if (presentation === 'link') {
            return createLink({
                href: element.url,
                children: [{ text: element.oembed.title ?? humanFriendlyUrl(element.url) }],
            });
        }

        if (presentation === 'embed' && element.oembed.type === 'video') {
            return createVideoBookmark({ oembed: element.oembed, url: element.url });
        }

        if (presentation === 'embed') {
            return createEmbed({ oembed: element.oembed, url: element.url });
        }

        return undefined;
    }

    const converted = convert();

    if (converted) {
        EditorCommands.replaceNode(editor, converted, {
            at: [],
            match: (node: Node) => BookmarkNode.isBookmarkNode(node) && node.uuid === element.uuid,
            select: true,
        });
    }
}
