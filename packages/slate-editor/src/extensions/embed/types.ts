import type { BookmarkNode } from '@prezly/slate-types';

import type { EmbedNode } from './EmbedNode';

export type Presentation = `${typeof EmbedNode.TYPE}` | `${typeof BookmarkNode.TYPE}`;
