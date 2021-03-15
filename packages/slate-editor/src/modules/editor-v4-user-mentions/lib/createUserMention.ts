import { USER_MENTION_TYPE } from '../constants';
import { User, UserMentionElementType } from '../types';

const createUserMention = (user: User): UserMentionElementType => ({
    children: [{ text: '' }],
    type: USER_MENTION_TYPE,
    user,
});

export default createUserMention;
