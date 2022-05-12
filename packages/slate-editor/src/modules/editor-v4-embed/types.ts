import type { OEmbedInfo } from '@prezly/sdk';

export interface EmbedExtensionConfiguration {
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
    showAsScreenshot: boolean;
}
