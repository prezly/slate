import type { ParagraphNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React from 'react';

import type { Dropdown } from '#components/Menu';
import { ParagraphElement } from '#modules/editor-v4-paragraphs';
import type { RichTextElementType } from '#modules/editor-v4-rich-formatting';
import { RichTextElement } from '#modules/editor-v4-rich-formatting';

import type { Formatting } from '../types';

import styles from './DropdownOption.module.scss';

type Option = Dropdown.Option<Formatting>;

interface Props {
    option: Option;
}

export function DropdownOption({ option }: Props) {
    if (option.value === 'multiple') {
        return <div className={classNames(styles.DropdownOption)}>{option.label}</div>;
    }

    if (option.value === 'paragraph') {
        const mockParagraphElement: ParagraphNode = { children: [], type: 'paragraph' };
        return (
            <ParagraphElement
                className={classNames(styles.DropdownOption, styles.paragraph)}
                element={mockParagraphElement}
            >
                {option.label}
            </ParagraphElement>
        );
    }

    return (
        <RichTextElement
            className={classNames(styles.DropdownOption, {
                [styles.heading1]: option.value === 'heading-one',
                [styles.heading2]: option.value === 'heading-two',
                [styles.blockquote]: option.value === 'block-quote',
                [styles.orderedList]: option.value === 'numbered-list',
                [styles.unorderedList]: option.value === 'bulleted-list',
            })}
            element={createMockElement(option.value)}
        >
            {option.label}
        </RichTextElement>
    );
}

function createMockElement(formatting: Formatting): RichTextElementType {
    return {
        type: formatting,
        children: [],
    } as unknown as RichTextElementType;
}
