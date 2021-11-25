import type { FunctionComponent } from 'react';
import * as React from 'react';

import type { Option } from '../../../../modules/editor-v4-mentions';
import type { Placeholder } from '../../types';

interface Props {
    option: Option<Placeholder>;
}

const PlaceholderMentionsDropdownOption: FunctionComponent<Props> = ({ option }) => (
    <span>{option.value.text}</span>
);

export default PlaceholderMentionsDropdownOption;
