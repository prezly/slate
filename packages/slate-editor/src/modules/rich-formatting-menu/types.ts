import type { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

import type { ElementType } from '#extensions/rich-formatting';

export type Formatting = typeof PARAGRAPH_NODE_TYPE | ElementType | 'multiple';
