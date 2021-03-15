import { MentionElementType } from 'modules/editor-v4-mentions';

import { USER_MENTION_TYPE } from './constants';

export type UserMentionType = typeof USER_MENTION_TYPE;

export interface User {
    avatar_url: string;
    id: number;
    name: string;
}

export interface UserMentionElementType extends MentionElementType<UserMentionType> {
    user: User;
}

export interface UserMentionsExtensionParameters {
    users: User[];
}
