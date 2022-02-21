import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

import { ParagraphElement } from '#modules/editor-v4-paragraphs';
import type { RichTextElementType } from '#modules/editor-v4-rich-formatting';
import { RichTextElement } from '#modules/editor-v4-rich-formatting';

import type { SelectedNodeType } from '../types';

interface Props {
    className?: string;
    type: SelectedNodeType;
}

export const MenuOption: FunctionComponent<Props> = ({ children, className, type }) => {
    if (type === 'multiple') {
        return (
            <div className={classNames('editor-menu-dropdown__menu-option', className)}>
                {children}
            </div>
        );
    }

    if (type === 'paragraph') {
        const mockParagraphElement = { children: [], type };
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
            element={createMockElement(type)}
        >
            {children}
        </RichTextElement>
    );
};

function createMockElement(type: SelectedNodeType): RichTextElementType {
    return {
        type,
        children: [],
    } as unknown as RichTextElementType;
}
