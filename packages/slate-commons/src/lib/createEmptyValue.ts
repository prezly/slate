import { PARAGRAPH_NODE_TYPE, ParagraphNode } from '@prezly/slate-types';

const createEmptyValue = (): [ParagraphNode] => [
    {
        children: [{ text: '' }],
        type: PARAGRAPH_NODE_TYPE,
    },
];

export default createEmptyValue;
