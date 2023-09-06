import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Node } from 'slate';

import { humanFriendlyUrl } from '#lib';

import { createLink } from '#extensions/inline-links';
import { createWebBookmark } from '#extensions/web-bookmark';

import { EmbedNode } from '../EmbedNode';
import type { Presentation } from '../types';

export function convertEmbed(editor: Editor, element: EmbedNode, presentation: Presentation) {
    function convert() {
        if (presentation === 'card') {
            return createWebBookmark({ oembed: element.oembed, url: element.url });
        }
        if (presentation === 'link') {
            return createLink({
                href: element.url,
                children: [{ text: element.oembed.title ?? humanFriendlyUrl(element.url) }],
            });
        }
        return undefined;
    }

    const converted = convert();

    if (converted) {
        EditorCommands.replaceNode(editor, converted, {
            at: [],
            match: (node: Node) => EmbedNode.isEmbedNode(node) && node.uuid === element.uuid,
            select: true,
        });
    }
}
