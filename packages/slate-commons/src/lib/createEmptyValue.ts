import { ElementNode, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

const createEmptyValue = (): ElementNode[] => [
    {
        children: [{ text: '' }],
        type: PARAGRAPH_NODE_TYPE,
    },
];

export default createEmptyValue;
