import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { ParagraphElement } from '../../../modules/editor-v4-paragraphs';
import { BlockType, ElementType, RichTextElementType } from '../types';

import RichTextElement from './RichTextElement';

const createMockElement = (type: ElementType): RichTextElementType => ({
    children: [],
    type,
});

interface Props {
    className?: string;
    type: BlockType;
}

const MenuOption: FunctionComponent<Props> = ({ children, className, type }) => {
    if (type === 'multiple') {
        return (
            <div className={classNames('floating-menu-dropdown__menu-option', className)}>
                {children}
            </div>
        );
    }

    if (type === 'paragraph') {
        const mockParagraphElement = { children: [], type };
        return (
            <ParagraphElement
                className={classNames('floating-menu-dropdown__menu-option', className)}
                element={mockParagraphElement}
            >
                {children}
            </ParagraphElement>
        );
    }

    return (
        <RichTextElement
            className={classNames('floating-menu-dropdown__menu-option', className)}
            element={createMockElement(type)}
        >
            {children}
        </RichTextElement>
    );
};

export default MenuOption;
