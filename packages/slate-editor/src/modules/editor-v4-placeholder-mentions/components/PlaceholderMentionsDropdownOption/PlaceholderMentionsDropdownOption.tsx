import React, { FunctionComponent } from 'react';

import { Option } from 'modules/editor-v4-mentions';

import { Placeholder } from '../../types';

interface Props {
    option: Option<Placeholder>;
}

const PlaceholderMentionsDropdownOption: FunctionComponent<Props> = ({ option }) => (
    <span>{option.value.text}</span>
);

export default PlaceholderMentionsDropdownOption;
