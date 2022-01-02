import type { FunctionComponent } from 'react';
import React from 'react';
import type { Range } from 'slate';

import type { Option } from '../../../../modules/editor-v4-mentions';
import { MentionsDropdown } from '../../../../modules/editor-v4-mentions';
import type { Placeholder } from '../../types';
import { PlaceholderMentionsDropdownOption } from '../PlaceholderMentionsDropdownOption';

interface Props {
    index: number;
    onOptionClick: (option: Option<Placeholder>) => void;
    options: Option<Placeholder>[];
    target: Range | null;
}

export const PlaceholderMentionsDropdown: FunctionComponent<Props> = ({
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
