import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

export function createEmptyValue() {
    return [
        {
            children: [{ text: '' }],
            type: PARAGRAPH_NODE_TYPE,
        },
    ];
}
