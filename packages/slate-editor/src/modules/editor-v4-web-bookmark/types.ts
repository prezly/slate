import type { OEmbedInfo } from '@prezly/sdk';
import type { RefObject } from 'react';

export interface WebBookmarkExtensionParameters {
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
}

export interface WebBookmarkParameters extends WebBookmarkExtensionParameters {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
}
