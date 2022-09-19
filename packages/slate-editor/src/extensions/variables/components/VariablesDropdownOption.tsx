import type { FunctionComponent } from 'react';
import React from 'react';

import type { Option } from '#extensions/mentions';

import type { Variable } from '../types';

interface Props {
    option: Option<Variable>;
}

export const VariablesDropdownOption: FunctionComponent<Props> = ({ option }) => (
    <span>{option.value.text}</span>
);
