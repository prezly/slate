import { isMentionNode } from '@prezly/slate-types';

import { UserMentionElementType } from '../types';

import createUserMention from './createUserMention';

const parseSerializedElement = (serialized: string): UserMentionElementType | undefined => {
    const parsed = JSON.parse(serialized);

    if (isMentionNode(parsed)) {
        return createUserMention(parsed.user);
    }

    return undefined;
};

export default parseSerializedElement;
