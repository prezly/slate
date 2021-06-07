import { OEmbedInfo } from '@prezly/sdk';
import { v4 as uuidV4 } from 'uuid';

import { EMBED_TYPE } from '../constants';
import { EmbedElementType } from '../types';

const createEmbed = (oembed: OEmbedInfo, url: string): EmbedElementType => ({
    children: [{ text: '' }],
    oembed,
    type: EMBED_TYPE,
    url,
    uuid: uuidV4(),
});

export default createEmbed;
