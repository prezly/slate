import { type Range } from '@udecode/plate';
import React from 'react';

import { Avatar } from '#components';

import type { Option } from '#extensions/mentions';
import { MentionsDropdown } from '#extensions/mentions';

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
                className={styles.Avatar}
                name={value.name}
                size="small"
                src={value.avatar_url}
            />
            <span>{value.name}</span>
        </div>
    );
}
