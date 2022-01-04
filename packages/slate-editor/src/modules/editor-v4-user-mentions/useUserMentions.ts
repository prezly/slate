import { useMemo } from 'react';

import type { Option } from '#modules/editor-v4-mentions';
import { useMentions } from '#modules/editor-v4-mentions';

import { createUserMention } from './lib';
import type { User, UserMentionsExtensionParameters } from './types';

function userToOption(user: User): Option<User> {
    return {
        id: user.id,
        label: user.name,
        value: user,
    };
}

const DEFAULT_PARAMETERS: UserMentionsExtensionParameters = { users: [] };

export function useUserMentions({ users }: UserMentionsExtensionParameters = DEFAULT_PARAMETERS) {
    const options = useMemo(() => users.map(userToOption), [users]);

    return useMentions<User>({
        createMentionElement: (option) => createUserMention(option.value),
        options,
        trigger: '@',
    });
}
