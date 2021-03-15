import { UserMentionElementType } from '../types';

import createUserMention from './createUserMention';
import isUserMentionElement from './isUserMentionElement';

const parseSerializedElement = (serialized: string): UserMentionElementType | undefined => {
    const parsed = JSON.parse(serialized);

    if (isUserMentionElement(parsed)) {
        return createUserMention(parsed.user);
    }

    return undefined;
};

export default parseSerializedElement;
