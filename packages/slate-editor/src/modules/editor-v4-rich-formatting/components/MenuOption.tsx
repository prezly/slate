import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

import { ParagraphElement } from '../../../modules/editor-v4-paragraphs';
import type { BlockType, RichTextElementType } from '../types';

import { RichTextElement } from './RichTextElement';

const createMockElement = (type: BlockType): RichTextElementType =>
    ({
        children: [],
        type,
    } as unknown as RichTextElementType);

interface Props {
    className?: string;
    type: BlockType;
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
