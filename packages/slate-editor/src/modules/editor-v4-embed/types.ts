import { RefObject } from 'react';
import { Element } from 'slate';

import { OEmbedInfo } from 'types';

import { EMBED_TYPE } from './constants';

export type EmbedType = typeof EMBED_TYPE;

export interface EmbedElementType extends Element {
    oembed: OEmbedInfo;
    type: EmbedType;
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
