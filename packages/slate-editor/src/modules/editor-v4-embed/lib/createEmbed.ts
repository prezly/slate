import { OEmbedInfo } from '@prezly/sdk';
import { EmbedNode } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

import { EMBED_TYPE } from '../constants';

const createEmbed = (oembed: OEmbedInfo, url: string): EmbedNode => ({
    type: EMBED_TYPE,
    children: [{ text: '' }],
    oembed,
    url,
    uuid: uuidV4(),
});

export default createEmbed;
