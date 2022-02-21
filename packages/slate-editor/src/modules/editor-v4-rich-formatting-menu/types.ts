import type { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

import type { ElementType } from '#modules/editor-v4-rich-formatting';

export type SelectedNodeType = typeof PARAGRAPH_NODE_TYPE | ElementType | 'multiple';
