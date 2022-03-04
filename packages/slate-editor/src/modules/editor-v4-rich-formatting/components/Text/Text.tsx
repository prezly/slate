import React from 'react';
import type { RenderLeafProps } from 'slate-react';

import { MarkType } from '../../types';

import styled from './Text.module.scss';

export function Text({ attributes, children, leaf }: RenderLeafProps) {
    if (leaf[MarkType.BOLD]) {
        children = <strong>{children}</strong>;
    }

    if (leaf[MarkType.ITALIC]) {
        children = <em>{children}</em>;
    }

    if (leaf[MarkType.SUBSCRIPT]) {
        children = <sub>{children}</sub>;
    }

    if (leaf[MarkType.SUPERSCRIPT]) {
        children = <sup>{children}</sup>;
    }

    if (leaf[MarkType.UNDERLINED]) {
        children = <u>{children}</u>;
    }

    if (leaf[MarkType.SELECTION]) {
        children = (
            <span {...attributes} className={styled.selection}>
                {children}
            </span>
        );
    }

    return <span {...attributes}>{children}</span>;
}
