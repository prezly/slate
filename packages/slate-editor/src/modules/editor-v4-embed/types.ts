import { OEmbedInfo } from '@prezly/sdk';
import { ElementNode } from '@prezly/slate-types';
import { RefObject } from 'react';

import { EMBED_TYPE } from './constants';

export type EmbedType = typeof EMBED_TYPE;

export interface EmbedElementType extends ElementNode<EmbedType> {
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
