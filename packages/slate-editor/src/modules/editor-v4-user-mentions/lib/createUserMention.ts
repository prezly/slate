import type { MentionNode } from '@prezly/slate-types';
import { MENTION_NODE_TYPE } from '@prezly/slate-types';

export function createUserMention(user: MentionNode['user']): MentionNode {
    return {
        children: [{ text: '' }],
        type: MENTION_NODE_TYPE,
        user,
    };
}

