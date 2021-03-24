import React, { FunctionComponent } from 'react';
import { Range } from 'slate';

import { MentionsDropdown, Option } from '../../../../modules/editor-v4-mentions';
import { User } from '../../types';
import UserMentionsDropdownOption from '../UserMentionsDropdownOption';

interface Props {
    index: number;
    onOptionClick: (option: Option<User>) => void;
    options: Option<User>[];
    target: Range | null;
}

const UserMentionsDropdown: FunctionComponent<Props> = ({
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

export default UserMentionsDropdown;
