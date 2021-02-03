import { Node } from 'slate';

import { PARAGRAPH_TYPE } from '../constants';

const createEmptyValue = (): Node[] => [
    {
        children: [{ text: '' }],
        type: PARAGRAPH_TYPE,
    },
];

export default createEmptyValue;
