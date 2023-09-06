import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Node } from 'slate';

import { humanFriendlyUrl } from '#lib';

import { createLink } from '#extensions/inline-links';
import { createWebBookmark } from '#extensions/web-bookmark';

import { EmbedNode } from '../EmbedNode';
import type { Presentation } from '../types';

export function convertEmbed(editor: Editor, element: EmbedNode, presentation: Presentation) {
    if (presentation === 'card') {
        EditorCommands.replaceNode(
            editor,
            {
                at: [],
                match: (node) => node === element,
                select: true,
            },
            createWebBookmark({ oembed: element.oembed, url: element.url }),
        );
    } else if (presentation === 'link') {
        EditorCommands.replaceNode(
            editor,
            {
                at: [],
                match: (node: Node) => EmbedNode.isEmbedNode(node) && node.uuid === element.uuid,
                select: true,
            },
            createLink({
                href: element.url,
                children: [{ text: element.oembed.title ?? humanFriendlyUrl(element.url) }],
            }),
        );
    }
}
