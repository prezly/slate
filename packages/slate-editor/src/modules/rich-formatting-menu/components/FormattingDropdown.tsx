import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import React from 'react';

import { Menu } from '#components';

import { ElementType } from '#extensions/text-styling';

import type { Formatting } from '../types';

import styles from './FormattingDropdown.module.scss';

interface Props {
    onChange: (value: Formatting) => void;
    value: Formatting | null;
}

type Option = Menu.Dropdown.Option<Formatting>;

const OPTIONS: Option[] = [
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

export function FormattingDropdown({ value, onChange }: Props) {
    return (
        <Menu.Dropdown<Formatting>
            id="prezly-editor-toolbar-dropdown"
            onChange={onChange}
            options={OPTIONS}
            renderOption={DropdownOption}
            value={value || undefined}
        />
    );
}

function DropdownOption(props: { option: Option }) {
    const { value, label } = props.option;
    return (
        <div
            className={classNames(styles.DropdownOption, {
                [styles.headingOne]: value === 'heading-one',
                [styles.headingTwo]: value === 'heading-two',
                [styles.blockquote]: value === 'block-quote',
                [styles.orderedList]: value === 'numbered-list',
                [styles.unorderedList]: value === 'bulleted-list',
            })}
        >
            {label}
        </div>
    );
}
