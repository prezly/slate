import type { OEmbedInfo } from '@prezly/sdk';

export interface WebBookmarkExtensionParameters {
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
}
