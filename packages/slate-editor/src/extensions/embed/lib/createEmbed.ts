import type { OEmbedInfo } from '@prezly/sdk';
import { EmbedNode } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

export function createEmbed(oembed: OEmbedInfo, url: string): EmbedNode {
    return {
        type: EmbedNode.TYPE,
        children: [{ text: '' }],
        oembed,
        url,
        uuid: uuidV4(),
    };
}
