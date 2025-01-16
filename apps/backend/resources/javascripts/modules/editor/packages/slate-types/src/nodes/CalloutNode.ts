import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import type { Alignable } from './interfaces';

export interface CalloutNode extends ElementNode, Alignable {
    type: typeof CalloutNode.TYPE;
    icon?: string;
}

export namespace CalloutNode {
    export const TYPE = 'callout';

    export function isCalloutNode(value: any): value is CalloutNode {
        return (
            isElementNode<CalloutNode>(value, CalloutNode.TYPE) &&
            (typeof value.align === 'undefined' || typeof value.align === 'string') &&
            (typeof value.icon === 'undefined' || typeof value.icon === 'string')
        );
    }
}
