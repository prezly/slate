import React, { FunctionComponent } from 'react';

import { Avatar } from '../../../../components';
import { Option } from '../../../../modules/editor-v4-mentions';
import { User } from '../../types';

import './UserMentionsDropdownOption.scss';

interface Props {
    option: Option<User>;
}

const UserMentionsDropdownOption: FunctionComponent<Props> = ({ option }) => (
    <div className="editor-v4-user-mentions-dropdown-option">
        <Avatar
            className="editor-v4-user-mentions-dropdown-option__avatar"
            name={option.value.name}
            size="small"
            src={option.value.avatar_url}
        />
        <span>{option.value.name}</span>
    </div>
);

export default UserMentionsDropdownOption;
