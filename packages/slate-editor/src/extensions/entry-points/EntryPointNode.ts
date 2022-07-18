import type { ElementNode } from '@prezly/slate-types';
import { isElementNode } from '@prezly/slate-types';

const ENTRY_POINT_NODE_TYPE = 'entry_point';

export interface EntryPointNode extends ElementNode {
    type: typeof ENTRY_POINT_NODE_TYPE;
}

export namespace EntryPointNode {
    export const TYPE = ENTRY_POINT_NODE_TYPE;

    export function isEntryPoint(node: any): node is ElementNode {
        return isElementNode(node, TYPE);
    }

    export function createEntryPoint(): EntryPointNode {
        return {
            type: TYPE,
            children: [{ text: '' }],
        };
    }
}
