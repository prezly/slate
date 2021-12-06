import type { ParagraphNode } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

export function createEmptyValue(): [ParagraphNode] {
    return [
        {
            children: [{ text: '' }],
            type: PARAGRAPH_NODE_TYPE,
        },
    ];
}