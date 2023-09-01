import type { OEmbedInfo } from '@prezly/sdk';

export interface WebBookmarkExtensionParameters {
    withNewTabOption?: boolean;
    withConversionOptions?: boolean;
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
}

export type Presentation = 'embed' | 'card';
