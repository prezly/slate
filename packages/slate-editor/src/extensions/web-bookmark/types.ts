import type { OEmbedInfo } from '@prezly/sdk';
import type { BookmarkNode } from '@prezly/slate-types';

import type { EmbedNode } from '#extensions/embed';

export interface WebBookmarkExtensionParameters {
    withNewTabOption?: boolean;
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
}

export type Presentation = `${typeof EmbedNode.TYPE}` | `${typeof BookmarkNode.TYPE}`;
