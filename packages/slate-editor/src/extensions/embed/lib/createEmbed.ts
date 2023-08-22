import type { OEmbedInfo } from '@prezly/sdk';
import { v4 as uuidV4 } from 'uuid';

import { EmbedNode } from '../EmbedNode';

export function createEmbed(oembed: OEmbedInfo, url: string): EmbedNode {
    return {
        type: EmbedNode.TYPE,
        children: [{ text: '' }],
        oembed,
        url,
        uuid: uuidV4(),
    };
}
