import { EmbedNode } from '@prezly/slate-types';

import { createEmbed } from './createEmbed';

export function parseSerializedElement(serialized: string): EmbedNode | undefined {
    const parsed = JSON.parse(serialized);

    if (EmbedNode.isEmbedNode(parsed)) {
        return createEmbed(parsed.oembed, parsed.url);
    }

    return undefined;
}
