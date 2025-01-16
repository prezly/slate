import { type RenderLeafProps } from '@udecode/plate';
import React from 'react';

import { MarkType } from '../types';

export function Text({ children, text }: RenderLeafProps) {
    if (text[MarkType.BOLD]) {
        children = <strong>{children}</strong>;
    }

    if (text[MarkType.ITALIC]) {
        children = <em>{children}</em>;
    }

    if (text[MarkType.SUBSCRIPT]) {
        children = <sub>{children}</sub>;
    }

    if (text[MarkType.SUPERSCRIPT]) {
        children = <sup>{children}</sup>;
    }

    if (text[MarkType.UNDERLINED]) {
        children = <u>{children}</u>;
    }

    if (text[MarkType.HIGHLIGHTED]) {
        children = <mark>{children}</mark>;
    }

    return <>{children}</>;
}
