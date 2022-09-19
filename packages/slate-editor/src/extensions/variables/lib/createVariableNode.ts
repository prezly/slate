import type { VariableKey, VariableNode } from '@prezly/slate-types';
import { VARIABLE_NODE_TYPE } from '@prezly/slate-types';

export function createVariableNode(key: VariableKey): VariableNode {
    return {
        children: [{ text: '' }],
        key,
        type: VARIABLE_NODE_TYPE,
    };
}
