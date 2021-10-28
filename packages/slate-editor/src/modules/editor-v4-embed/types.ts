import { OEmbedInfo } from '@prezly/sdk';
import { RefObject } from 'react';

import { EMBED_TYPE } from './constants';

export interface EmbedElementType extends Element {
    type: typeof EMBED_TYPE;
    oembed: OEmbedInfo;
    url: string;
    uuid: string;
}

export interface EmbedExtensionParameters {
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
    showAsScreenshot: boolean;
}

export interface EmbedParameters extends EmbedExtensionParameters {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
}
