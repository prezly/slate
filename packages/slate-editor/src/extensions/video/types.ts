import type { BookmarkNode } from '@prezly/slate-types';

import type { EmbedNode } from '#extensions/embed';

export type Presentation = `${typeof EmbedNode.TYPE}` | `${typeof BookmarkNode.TYPE}`;
