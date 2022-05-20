import type { OEmbedInfo } from '@prezly/sdk';

export interface VideoExtensionParameters {
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
}
