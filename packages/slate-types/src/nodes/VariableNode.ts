import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export const VARIABLE_NODE_TYPE = 'placeholder';

export interface VariableNode extends ElementNode {
    type: typeof VARIABLE_NODE_TYPE;
    key: string;
}

export function isVariableNode(value: any): value is VariableNode {
    return isElementNode<VariableNode>(value, VARIABLE_NODE_TYPE);
}
