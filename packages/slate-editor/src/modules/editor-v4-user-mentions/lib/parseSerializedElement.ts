import type { MentionNode } from '@prezly/slate-types';
import { isMentionNode } from '@prezly/slate-types';

import { createUserMention } from './createUserMention';

export function parseSerializedElement(serialized: string): MentionNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isMentionNode(parsed)) {
        return createUserMention(parsed.user);
    }

    return undefined;
}

