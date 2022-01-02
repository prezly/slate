import type { FunctionComponent } from 'react';
import React from 'react';
import type { Range } from 'slate';

import type { Option } from '../../../../modules/editor-v4-mentions';
import { MentionsDropdown } from '../../../../modules/editor-v4-mentions';
import type { User } from '../../types';
import { UserMentionsDropdownOption } from '../UserMentionsDropdownOption';

interface Props {
    index: number;
    onOptionClick: (option: Option<User>) => void;
    options: Option<User>[];
    target: Range | null;
}

export const UserMentionsDropdown: FunctionComponent<Props> = ({
    index,
    onOptionClick,
    options,
    target,
}) => (
    <MentionsDropdown
        index={index}
        onOptionClick={onOptionClick}
        options={options}
        renderOption={(option) => <UserMentionsDropdownOption option={option} />}
        target={target}
    />
);

