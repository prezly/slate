import type { ParagraphNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';

import { ParagraphElement } from '#modules/editor-v4-paragraphs';
import type { RichTextElementType } from '#modules/editor-v4-rich-formatting';
import { RichTextElement } from '#modules/editor-v4-rich-formatting';

import type { Formatting } from '../types';

import styles from './MenuOption.module.scss';

interface Props {
    children: ReactNode;
    formatting: Formatting;
}

export function MenuOption({ children, formatting }: Props) {
    if (formatting === 'multiple') {
        return <div className={classNames(styles.MenuOption)}>{children}</div>;
    }

    if (formatting === 'paragraph') {
        const mockParagraphElement: ParagraphNode = { children: [], type: formatting };
        return (
            <ParagraphElement
                className={classNames(styles.MenuOption, styles.paragraph)}
                element={mockParagraphElement}
            >
                {children}
            </ParagraphElement>
        );
    }

    return (
        <RichTextElement
            className={classNames(styles.MenuOption, {
                [styles.heading1]: formatting === 'heading-one',
                [styles.heading2]: formatting === 'heading-two',
                [styles.blockquote]: formatting === 'block-quote',
                [styles.orderedList]: formatting === 'numbered-list',
                [styles.unorderedList]: formatting === 'bulleted-list',
            })}
            element={createMockElement(formatting)}
        >
            {children}
        </RichTextElement>
    );
}

function createMockElement(formatting: Formatting): RichTextElementType {
    return {
        type: formatting,
        children: [],
    } as unknown as RichTextElementType;
}
