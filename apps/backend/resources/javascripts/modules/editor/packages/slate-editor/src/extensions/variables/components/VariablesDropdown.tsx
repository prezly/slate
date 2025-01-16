import { type Range } from '@udecode/plate';
import React from 'react';

import type { Option } from '#extensions/mentions';
import { MentionsDropdown } from '#extensions/mentions';

import type { Variable } from '../types';

interface Props {
    index: number;
    onOptionClick: (option: Option<Variable>) => void;
    options: Option<Variable>[];
    target: Range | null;
}

export function VariablesDropdown({ index, onOptionClick, options, target }: Props) {
    return (
        <MentionsDropdown
            index={index}
            onOptionClick={onOptionClick}
            options={options}
            renderOption={(option) => <VariablesOption option={option} />}
            target={target}
        />
    );
}

function VariablesOption(props: { option: Option<Variable> }) {
    return <span>{props.option.value.text}</span>;
}
