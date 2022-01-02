import type { FunctionComponent } from 'react';
import React from 'react';

import type { Option } from '../../../../modules/editor-v4-mentions';
import type { Placeholder } from '../../types';

interface Props {
    option: Option<Placeholder>;
}

export const PlaceholderMentionsDropdownOption: FunctionComponent<Props> = ({ option }) => (
    <span>{option.value.text}</span>
);

