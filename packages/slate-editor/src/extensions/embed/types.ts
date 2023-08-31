import type { BOOKMARK_NODE_TYPE } from '@prezly/slate-types';

import type { EmbedNode } from './EmbedNode';

export type Presentation = `${typeof EmbedNode.TYPE}` | `${typeof BOOKMARK_NODE_TYPE}`;
