import { isMentionNode, MentionNode } from '@prezly/slate-types';

import createUserMention from './createUserMention';

const parseSerializedElement = (serialized: string): MentionNode | undefined => {
    const parsed = JSON.parse(serialized);

    if (isMentionNode(parsed)) {
        return createUserMention(parsed.user);
    }

    return undefined;
};

export default parseSerializedElement;
