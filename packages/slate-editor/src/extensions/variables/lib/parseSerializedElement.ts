import { type VariableNode, isVariableNode } from '@prezly/slate-types';

import { createVariableNode } from './createVariableNode';

export function parseSerializedElement(serialized: string): VariableNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isVariableNode(parsed)) {
        return createVariableNode(parsed.key);
    }

    return undefined;
}
