import type { OEmbedInfo } from '@prezly/sdk';
import type { RefObject } from 'react';

export interface VideoExtensionParameters {
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
}

export interface VideoParameters extends VideoExtensionParameters {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
}
