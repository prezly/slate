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
    { hidden: true, label: 'Multiple', value: 'multiple' },
    {
        label: 'Paragraph',
        value: PARAGRAPH_NODE_TYPE,
        render: (option) => (
            <MenuOption
                className="editor-menu-dropdown__menu-option--paragraph"
                formatting={option.value}
            >
                {option.label}
            </MenuOption>
        ),
    },
    {
        label: 'Heading 1',
        value: ElementType.HEADING_ONE,
        render: (option) => (
            <MenuOption
                className="editor-menu-dropdown__menu-option--heading-1"
                formatting={option.value}
            >
                {option.label}
            </MenuOption>
        ),
    },
    {
        label: 'Heading 2',
        value: ElementType.HEADING_TWO,
        render: (option) => (
            <MenuOption
                className="editor-menu-dropdown__menu-option--heading-2"
                formatting={option.value}
            >
                {option.label}
            </MenuOption>
        ),
    },
    {
        label: 'Unordered List',
        value: ElementType.BULLETED_LIST,
        render: (option) => (
            <MenuOption
                className="editor-menu-dropdown__menu-option--unordered-list"
                formatting={option.value}
            >
                <li>{option.label}</li>
            </MenuOption>
        ),
    },
    {
        label: 'Ordered List',
        value: ElementType.NUMBERED_LIST,
        render: (option) => (
            <MenuOption
                className="editor-menu-dropdown__menu-option--ordered-list"
                formatting={option.value}
            >
                <li>{option.label}</li>
            </MenuOption>
        ),
    },
    {
        label: '“Quote”',
        value: ElementType.BLOCK_QUOTE,
        render: (option) => (
            <MenuOption
                className="editor-menu-dropdown__menu-option--blockquote"
                formatting={option.value}
            >
                {option.label}
            </MenuOption>
        ),
    },
];

export function BlockDropdown({ value, onChange }: Props) {
    return (
        <Dropdown<Formatting>
            id="prezly-editor-toolbar-dropdown"
            onChange={onChange}
            options={OPTIONS}
            value={value || undefined}
        />
    );
}
