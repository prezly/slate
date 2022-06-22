import type { ElementNode } from '@prezly/slate-types';
import { isElementNode } from '@prezly/slate-types';

export const ENTRY_POINT_NODE_TYPE = '__entry_point';

export interface EntryPointNode extends ElementNode {
    type: typeof ENTRY_POINT_NODE_TYPE;
}

export function isEntryPoint(node: any): node is ElementNode {
    return isElementNode(node, ENTRY_POINT_NODE_TYPE);
}

export function createEntryPoint(): EntryPointNode {
    return {
        type: ENTRY_POINT_NODE_TYPE,
        children: [{ text: '' }],
    };
}
