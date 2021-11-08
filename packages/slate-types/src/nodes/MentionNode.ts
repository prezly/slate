import ElementNode, { isElementNode } from './ElementNode';

export const MENTION_NODE_TYPE = 'mention';

export default interface MentionNode extends ElementNode {
    type: typeof MENTION_NODE_TYPE;
    user: {
        avatar_url: string;
        id: number;
        name: string;
    };
}

export const isMentionNode = (value: any): value is MentionNode =>
    isElementNode<MentionNode>(value, MENTION_NODE_TYPE);
