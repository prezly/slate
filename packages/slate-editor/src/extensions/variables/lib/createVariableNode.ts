import { type VariableNode, VARIABLE_NODE_TYPE } from '@prezly/slate-types';

export function createVariableNode(key: VariableNode['key']): VariableNode {
    return {
        children: [{ text: '' }],
        key,
        fallback: null,
        type: VARIABLE_NODE_TYPE,
    };
}
