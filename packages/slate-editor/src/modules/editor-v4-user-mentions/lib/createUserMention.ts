import type { MentionNode } from '@prezly/slate-types';
import { MENTION_NODE_TYPE } from '@prezly/slate-types';

const createUserMention = (user: MentionNode['user']): MentionNode => ({
    children: [{ text: '' }],
    type: MENTION_NODE_TYPE,
    user,
});

export default createUserMention;
