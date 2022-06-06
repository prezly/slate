import type { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

import type { ElementType } from '#extensions/text-styling';

export type Formatting = typeof PARAGRAPH_NODE_TYPE | ElementType | 'multiple';
