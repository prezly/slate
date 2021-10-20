import { useMemo } from 'react';

import { Option, useMentions } from '../../modules/editor-v4-mentions';

import { createUserMention } from './lib';
import { User, UserMentionsExtensionParameters } from './types';

const userToOption = (user: User): Option<User> => ({
    id: user.id,
    label: user.name,
    value: user,
});

const DEFAULT_PARAMETERS: UserMentionsExtensionParameters = { users: [] };

const useUserMentions = ({ users }: UserMentionsExtensionParameters = DEFAULT_PARAMETERS) => {
    const options = useMemo(() => users.map(userToOption), [users]);

    return useMentions<User>({
        createMentionElement: (option) => createUserMention(option.value),
        options,
        trigger: '@',
    });
};

export default useUserMentions;
