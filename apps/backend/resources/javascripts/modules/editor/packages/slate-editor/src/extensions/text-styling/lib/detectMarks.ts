import { MarkType } from '../types';

import { detectMark } from './detectMark';
import { isBold } from './isBold';
import { isHighlighted } from './isHighlighted';
import { isItalic } from './isItalic';
import { isSubscript } from './isSubscript';
import { isSuperscript } from './isSuperscript';
import { isUnderline } from './isUnderline';

export function detectMarks(element: HTMLElement): Partial<Record<MarkType, true>> {
    // Make sure to add only relevant marks to avoid creating a huge JSON
    // with lots of `false` attributes.
    const marks: Partial<Record<MarkType, true>> = {};

    if (detectMark(element, isBold)) {
        marks[MarkType.BOLD] = true;
    }

    if (detectMark(element, isItalic)) {
        marks[MarkType.ITALIC] = true;
    }

    if (detectMark(element, isSubscript)) {
        marks[MarkType.SUBSCRIPT] = true;
    }

    if (detectMark(element, isSuperscript)) {
        marks[MarkType.SUPERSCRIPT] = true;
    }

    if (detectMark(element, isUnderline)) {
        marks[MarkType.UNDERLINED] = true;
    }

    if (detectMark(element, isHighlighted)) {
        marks[MarkType.HIGHLIGHTED] = true;
    }

    return marks;
}
