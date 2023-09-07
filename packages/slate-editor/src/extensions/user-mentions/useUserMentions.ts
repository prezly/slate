import { useMemo } from 'react';

import type { Option } from '#extensions/mentions';
import { useMentions } from '#extensions/mentions';

import { createUserMention } from './lib';
import type { User } from './types';

function userToOption(user: User): Option<User> {
    return {
        id: user.id,
        label: user.name,
        value: user,
    };
}

export function useUserMentions(users: User[]) {
    const options = useMemo(() => users.map(userToOption), [JSON.stringify(users)]);

    return useMentions<User>({
        createMentionElement,
        options,
        trigger: '@',
    });
}

function createMentionElement(option: Option<User>) {
    return createUserMention(option.value);
}
