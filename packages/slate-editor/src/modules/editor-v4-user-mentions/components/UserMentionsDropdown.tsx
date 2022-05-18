import React from 'react';
import type { Range } from 'slate';

import { Avatar } from '#components';

import type { Option } from '#modules/editor-v4-mentions';
import { MentionsDropdown } from '#modules/editor-v4-mentions';

import type { User } from '../types';

import styles from './UserMentionsDropdown.module.scss';

interface Props {
    index: number;
    onOptionClick: (option: Option<User>) => void;
    options: Option<User>[];
    target: Range | null;
}

export function UserMentionsDropdown({ index, onOptionClick, options, target }: Props) {
    return (
        <MentionsDropdown
            index={index}
            onOptionClick={onOptionClick}
            options={options}
            renderOption={(option) => <DropdownOption option={option} />}
            target={target}
        />
    );
}

function DropdownOption(props: { option: Option<User> }) {
    const { value } = props.option;
    return (
        <div className={styles.DropdownOption}>
            <Avatar
                className={styles.avatar}
                name={value.name}
                size="small"
                src={value.avatar_url}
            />
            <span>{value.name}</span>
        </div>
    );
}
