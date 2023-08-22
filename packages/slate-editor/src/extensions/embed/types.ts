import type { OEmbedInfo } from '@prezly/sdk';

export enum Provider {
    INSTAGRAM = 'instagram',
    YOUTUBE = 'youtube',
}
export interface EmbedExtensionConfiguration {
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
    showAsScreenshot: boolean;
    providers: `${Provider}`[];
}
