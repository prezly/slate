import type { OEmbedInfo } from '@prezly/sdk';
import type { EmbedNode } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

import { EMBED_TYPE } from '../constants';

function createEmbed(oembed: OEmbedInfo, url: string): EmbedNode {
    return {
        type: EMBED_TYPE,
        children: [{ text: '' }],
        oembed,
        url,
        uuid: uuidV4(),
    };
}

export default createEmbed;
