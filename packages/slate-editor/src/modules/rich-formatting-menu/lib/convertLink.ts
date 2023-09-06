import type { OEmbedInfo } from '@prezly/sdk';
import { EditorCommands } from '@prezly/slate-commons';
import type { LinkNode } from '@prezly/slate-types';
import type { Editor, Node } from 'slate';

import { createEmbed } from '#extensions/embed';
import { createVideoBookmark } from '#extensions/video';
import { createWebBookmark } from '#extensions/web-bookmark';
import { EventsEditor } from '#modules/events';

import type { FetchOEmbedFn, Presentation } from '../types';

export async function convertLink(
    editor: Editor,
    element: LinkNode,
    presentation: Presentation,
    fetchOembed: FetchOEmbedFn,
) {
    let oembed: OEmbedInfo | undefined = undefined;
    try {
        oembed = await fetchOembed(element.href);
    } catch (error) {
        EventsEditor.dispatchEvent(editor, 'error', error);
        return;
    }

    // eslint-disable-next-line func-style
    const match = (node: Node) => node === element;

    if (presentation === 'embed') {
        const converted =
            oembed.type === 'video'
                ? createVideoBookmark({ oembed, url: element.href })
                : createEmbed({ oembed, url: element.href });

        EditorCommands.replaceNode(editor, { at: [], match, select: true }, converted);
    } else if (presentation === 'card') {
        const converted = createWebBookmark({ oembed, url: element.href });

        EditorCommands.replaceNode(editor, { at: [], match, select: true }, converted);
    }
}
