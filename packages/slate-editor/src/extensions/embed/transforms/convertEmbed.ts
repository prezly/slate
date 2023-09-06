import { EditorCommands } from '@prezly/slate-commons';
import type { BookmarkNode } from '@prezly/slate-types';
import type { Node, Editor } from 'slate';
import { Transforms } from 'slate';

import { humanFriendlyUrl } from '#lib';

import { createLink } from '#extensions/inline-links';
import { createWebBookmark } from '#extensions/web-bookmark';

import { EmbedNode } from '../EmbedNode';
import type { Presentation } from '../types';

export function convertEmbed(editor: Editor, element: EmbedNode, presentation: Presentation) {
    if (presentation === 'card') {
        Transforms.setNodes<BookmarkNode>(
            editor,
            createWebBookmark({ oembed: element.oembed, url: element.url }),
            {
                at: [],
                match: (node) => node === element,
            },
        );
    } else if (presentation === 'link') {
        EditorCommands.replaceNode(
            editor,
            {
                at: [],
                match: (node: Node) => EmbedNode.isEmbedNode(node) && node.uuid === element.uuid,
            },
            createLink({
                href: element.url,
                children: [{ text: element.oembed.title ?? humanFriendlyUrl(element.url) }],
            }),
        );
    }
}
