import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export const MENTION_NODE_TYPE = 'mention';

export interface MentionNode extends ElementNode {
    type: typeof MENTION_NODE_TYPE;
    user: {
        avatar_url: string;
        id: number;
        name: string;
    };
}

export function isMentionNode(value: any): value is MentionNode {
    return isElementNode<MentionNode>(value, MENTION_NODE_TYPE);
}
