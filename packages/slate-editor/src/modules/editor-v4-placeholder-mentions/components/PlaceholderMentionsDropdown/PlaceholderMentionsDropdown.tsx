import React, { FunctionComponent } from 'react';
import { Range } from 'slate';

import { MentionsDropdown, Option } from '../../../../modules/editor-v4-mentions';
import { Placeholder } from '../../types';
import PlaceholderMentionsDropdownOption from '../PlaceholderMentionsDropdownOption';

interface Props {
    index: number;
    onOptionClick: (option: Option<Placeholder>) => void;
    options: Option<Placeholder>[];
    target: Range | null;
}

const PlaceholderMentionsDropdown: FunctionComponent<Props> = ({
    index,
    onOptionClick,
    options,
    target,
}) => (
    <MentionsDropdown
        index={index}
        onOptionClick={onOptionClick}
        options={options}
        renderOption={(option) => <PlaceholderMentionsDropdownOption option={option} />}
        target={target}
    />
);

export default PlaceholderMentionsDropdown;
