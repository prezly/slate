import { Element } from 'slate';

export const MENTION_NODE_TYPE = 'mention';

export default interface MentionNode extends Element {
    type: typeof MENTION_NODE_TYPE;
    user: {
        avatar_url: string;
        id: number;
        name: string;
    };
}

export const isMentionNode = (value: any): value is MentionNode =>
    Element.isElementType(value, MENTION_NODE_TYPE);
