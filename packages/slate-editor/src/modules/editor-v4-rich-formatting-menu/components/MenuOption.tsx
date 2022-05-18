import type { ParagraphNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';

import { ParagraphElement } from '#modules/editor-v4-paragraphs';
import type { RichTextElementType } from '#modules/editor-v4-rich-formatting';
import { RichTextElement } from '#modules/editor-v4-rich-formatting';

import type { Formatting } from '../types';

interface Props {
    children: ReactNode;
    className?: string;
    formatting: Formatting;
}

export const MenuOption: FunctionComponent<Props> = ({ children, className, formatting }) => {
    if (formatting === 'multiple') {
        return (
            <div className={classNames('editor-menu-dropdown__menu-option', className)}>
                {children}
            </div>
        );
    }

    if (formatting === 'paragraph') {
        const mockParagraphElement: ParagraphNode = { children: [], type: formatting };
        return (
            <ParagraphElement
                className={classNames('editor-menu-dropdown__menu-option', className)}
                element={mockParagraphElement}
            >
                {children}
            </ParagraphElement>
        );
    }

    return (
        <RichTextElement
            className={classNames('editor-menu-dropdown__menu-option', className)}
            element={createMockElement(formatting)}
        >
            {children}
        </RichTextElement>
    );
};

function createMockElement(formatting: Formatting): RichTextElementType {
    return {
        type: formatting,
        children: [],
    } as unknown as RichTextElementType;
}
