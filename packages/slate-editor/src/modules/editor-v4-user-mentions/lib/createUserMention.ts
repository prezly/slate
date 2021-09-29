import { MENTION_NODE_TYPE, MentionNode } from '@prezly/slate-types';

const createUserMention = (user: MentionNode['user']): MentionNode => ({
    children: [{ text: '' }],
    type: MENTION_NODE_TYPE,
    user,
});

export default createUserMention;
