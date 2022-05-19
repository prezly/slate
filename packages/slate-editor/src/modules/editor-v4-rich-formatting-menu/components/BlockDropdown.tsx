import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';

import { Dropdown } from '#components/Menu';
import { ElementType } from '#modules/editor-v4-rich-formatting';

import type { Formatting } from '../types';

import { MenuOption } from './MenuOption';

interface Props {
    onChange: (value: Formatting) => void;
    value: Formatting | null;
}

const OPTIONS: Dropdown.Option<Formatting>[] = [
    {
        label: 'Multiple',
        value: 'multiple',
        hidden: true,
    },
    {
        label: 'Paragraph',
        value: PARAGRAPH_NODE_TYPE,
    },
    {
        label: 'Heading 1',
        value: ElementType.HEADING_ONE,
    },
    {
        label: 'Heading 2',
        value: ElementType.HEADING_TWO,
    },
    {
        label: 'Unordered List',
        value: ElementType.BULLETED_LIST,
    },
    {
        label: 'Ordered List',
        value: ElementType.NUMBERED_LIST,
    },
    {
        label: '“Quote”',
        value: ElementType.BLOCK_QUOTE,
    },
];

export function BlockDropdown({ value, onChange }: Props) {
    return (
        <Dropdown<Formatting>
            id="prezly-editor-toolbar-dropdown"
            onChange={onChange}
            options={OPTIONS}
            renderOption={MenuOption}
            value={value || undefined}
        />
    );
}
