import type { BOOKMARK_NODE_TYPE } from '@prezly/slate-types';

import type { EmbedNode } from '#extensions/embed';

export type Presentation = `${typeof EmbedNode.TYPE}` | `${typeof BOOKMARK_NODE_TYPE}`;
