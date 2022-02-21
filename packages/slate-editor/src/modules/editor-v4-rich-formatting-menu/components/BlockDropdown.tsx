import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';

import { Menu } from '#components';

import { ElementType } from '#modules/editor-v4-rich-formatting';

import type { SelectedNodeType } from '../types';

import { MenuOption } from './MenuOption';


interface Props {
    onChange: (value: SelectedNodeType) => void;
    value: SelectedNodeType | null;
}

const OPTIONS: Menu.DropdownOption<SelectedNodeType>[] = [
    { hidden: true, label: 'Multiple', value: 'multiple' },
    {
        label: 'Paragraph',
        value: PARAGRAPH_NODE_TYPE,
        render: (option) => (
            <MenuOption
                className="editor-menu-dropdown__menu-option--paragraph"
                type={option.value}
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
                type={option.value}
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
                type={option.value}
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
                type={option.value}
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
                type={option.value}
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
                type={option.value}
            >
                {option.label}
            </MenuOption>
        ),
    },
];

export function BlockDropdown({ value, onChange }: Props) {
    return (
        <Menu.Dropdown<SelectedNodeType>
            id="prezly-editor-toolbar-dropdown"
            onChange={onChange}
            options={OPTIONS}
            value={value || undefined}
        />
    );
}
