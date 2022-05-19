import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import React from 'react';

import { Dropdown } from '#components/Menu';
import { ElementType } from '#modules/editor-v4-rich-formatting';

import type { Formatting } from '../types';

import styles from './FormattingDropdown.module.scss';

interface Props {
    onChange: (value: Formatting) => void;
    value: Formatting | null;
}

type Option = Dropdown.Option<Formatting>;

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
        <Dropdown<Formatting>
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
                [styles.paragraph]: value === 'paragraph',
                [styles.heading1]: value === 'heading-one',
                [styles.heading2]: value === 'heading-two',
                [styles.blockquote]: value === 'block-quote',
                [styles.orderedList]: value === 'numbered-list',
                [styles.unorderedList]: value === 'bulleted-list',
            })}
        >
            {label}
        </div>
    );
}
