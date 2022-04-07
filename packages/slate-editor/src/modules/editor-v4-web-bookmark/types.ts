import type { OEmbedInfo } from '@prezly/sdk';

export interface WebBookmarkExtensionParameters {
    withNewTabOption?: boolean;
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
}
