import {
    BULLETED_LIST_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    HeadingRole,
    NUMBERED_LIST_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    QUOTE_NODE_TYPE,
} from '@prezly/slate-types';
import { reject } from '@technically/lodash';
import classNames from 'classnames';
import React, { useMemo } from 'react';

import { Menu } from '#components';

import type { Formatting } from '../types';

import styles from './FormattingDropdown.module.scss';

interface Props {
    onChange: (value: Formatting) => void;
    value: Formatting;
    disabled?: boolean;
    withBlockquotes: boolean;
    withHeadings: boolean;
    withLists: boolean;
    withParagraphs: boolean;
    withTitle: boolean;
    withSubtitle: boolean;
}

type Option = Menu.Dropdown.Option<Formatting>;

const OPTIONS: Option[] = [
    {
        label: 'Multiple',
        value: 'multiple',
        hidden: true,
    },
    {
        label: 'Title',
        value: HeadingRole.TITLE,
        hidden: true,
    },
    {
        label: 'Subtitle',
        value: HeadingRole.SUBTITLE,
        hidden: true,
    },
    {
        label: 'Paragraph',
        value: PARAGRAPH_NODE_TYPE,
    },
    {
        label: 'Heading 1',
        value: HEADING_1_NODE_TYPE,
    },
    {
        label: 'Heading 2',
        value: HEADING_2_NODE_TYPE,
    },
    {
        label: 'Ordered List',
        value: NUMBERED_LIST_NODE_TYPE,
    },
    {
        label: 'Unordered List',
        value: BULLETED_LIST_NODE_TYPE,
    },
    {
        label: '“Quote”',
        value: QUOTE_NODE_TYPE,
    },
];

export function FormattingDropdown({
    value,
    onChange,
    disabled = false,
    withBlockquotes,
    withHeadings,
    withLists,
    withParagraphs,
    withTitle = false,
    withSubtitle = false,
}: Props) {
    const options = useMemo(() => {
        const MAP: Partial<Record<Formatting, boolean>> = {
            [HeadingRole.TITLE]: withTitle,
            [HeadingRole.SUBTITLE]: withSubtitle,
            [PARAGRAPH_NODE_TYPE]: withParagraphs,
            [QUOTE_NODE_TYPE]: withBlockquotes,
            [HEADING_1_NODE_TYPE]: withHeadings,
            [HEADING_2_NODE_TYPE]: withHeadings,
            [BULLETED_LIST_NODE_TYPE]: withLists,
            [NUMBERED_LIST_NODE_TYPE]: withLists,
        };
        return reject(OPTIONS, ({ value }) => MAP[value] === false);
    }, [withBlockquotes, withHeadings, withLists, withParagraphs, withTitle, withSubtitle]);

    if (options.filter(({ hidden }) => !hidden).length <= 1) {
        return null;
    }

    return (
        <Menu.Dropdown<Formatting>
            id="prezly-editor-toolbar-dropdown"
            onChange={onChange}
            options={options}
            disabled={disabled}
            renderOption={DropdownOption}
            value={value}
        />
    );
}

function DropdownOption(props: { option: Option }) {
    const { value, label } = props.option;
    return (
        <div
            className={classNames(styles.DropdownOption, {
                [styles.headingOne]: value === 'heading-one' || value === HeadingRole.TITLE,
                [styles.headingTwo]: value === 'heading-two' || value === HeadingRole.SUBTITLE,
                [styles.blockquote]: value === 'block-quote',
                [styles.orderedList]: value === 'numbered-list',
                [styles.unorderedList]: value === 'bulleted-list',
            })}
        >
            {label}
        </div>
    );
}
