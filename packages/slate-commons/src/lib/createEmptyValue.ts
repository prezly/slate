import type { ParagraphNode } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

const createEmptyValue = (): [ParagraphNode] => [
    {
        children: [{ text: '' }],
        type: PARAGRAPH_NODE_TYPE,
    },
];

export default createEmptyValue;
