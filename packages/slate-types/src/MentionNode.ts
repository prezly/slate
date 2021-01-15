import ElementNode, { isElementNode } from './ElementNode';
import { isObject } from './lib';
import TextNode, { isTextNode } from './TextNode';

export const MENTION_NODE_TYPE = 'mention';

export default interface MentionNode extends ElementNode {
    children: TextNode[];
    type: typeof MENTION_NODE_TYPE;
    user: {
        avatar_url: string;
        id: number;
        name: string;
    };
}

export const isMentionNode = (value: any): value is MentionNode => {
    return (
        isElementNode(value) &&
        value.type === MENTION_NODE_TYPE &&
        isObject(value.user) &&
        typeof value.user.avatar_url === 'string' &&
        typeof value.user.id === 'number' &&
        typeof value.user.name === 'string' &&
        Array.isArray(value.children) &&
        value.children.every(isTextNode)
    );
};
