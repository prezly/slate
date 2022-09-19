import type { FunctionComponent } from 'react';
import React from 'react';
import type { Range } from 'slate';

import type { Option } from '#extensions/mentions';
import { MentionsDropdown } from '#extensions/mentions';

import type { Variable } from '../types';

import { VariablesDropdownOption } from './VariablesDropdownOption';

interface Props {
    index: number;
    onOptionClick: (option: Option<Variable>) => void;
    options: Option<Variable>[];
    target: Range | null;
}

export const VariablesDropdown: FunctionComponent<Props> = ({
    index,
    onOptionClick,
    options,
    target,
}) => (
    <MentionsDropdown
        index={index}
        onOptionClick={onOptionClick}
        options={options}
        renderOption={(option) => <VariablesDropdownOption option={option} />}
        target={target}
    />
);
