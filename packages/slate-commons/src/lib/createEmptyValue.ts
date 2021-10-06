import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import { Descendant } from 'slate';

const createEmptyValue = (): Descendant[] => [
    {
        children: [{ text: '' }],
        type: PARAGRAPH_NODE_TYPE,
    },
];

export default createEmptyValue;
