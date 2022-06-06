import type { OEmbedInfo } from '@prezly/sdk';
import type { EmbedNode } from '@prezly/slate-types';
import { EMBED_NODE_TYPE } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

export function createEmbed(oembed: OEmbedInfo, url: string): EmbedNode {
    return {
        type: EMBED_NODE_TYPE,
        children: [{ text: '' }],
        oembed,
        url,
        uuid: uuidV4(),
    };
}
