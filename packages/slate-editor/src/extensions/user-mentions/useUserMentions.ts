import { isSubtitleHeadingNode, isTitleHeadingNode } from '@prezly/slate-types';
import { useCallback, useMemo } from 'react';
import type { BaseRange } from 'slate';
import { Editor } from 'slate';

import type { Option } from '#extensions/mentions';
import { useMentions } from '#extensions/mentions';

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

export function useUserMentions(
    editor: Editor,
    { users }: UserMentionsExtensionParameters = DEFAULT_PARAMETERS,
) {
    const options = useMemo(() => users.map(userToOption), [users]);
    const isEnabled = useCallback(
        (range: BaseRange | null) => {
            if (!range) {
                return true;
            }

            const nodes = Array.from(
                Editor.nodes(editor, {
                    at: range,
                    match: (node) => isTitleHeadingNode(node) || isSubtitleHeadingNode(node),
                }),
            );
            return nodes.length === 0;
        },
        [editor],
    );

    return useMentions<User>({
        createMentionElement: (option) => createUserMention(option.value),
        isEnabled,
        options,
        trigger: '@',
    });
}
