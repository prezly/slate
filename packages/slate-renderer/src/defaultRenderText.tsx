import { TextNode } from '@prezly/slate-types';
import React, { ReactNode } from 'react';

const defaultRenderText = (text: TextNode): ReactNode => {
    let spanChildren: ReactNode = text.text;

    if (text.bold) {
        spanChildren = <strong>{spanChildren}</strong>;
    }

    if (text.italic) {
        spanChildren = <em>{spanChildren}</em>;
    }

    if (text.subscript) {
        spanChildren = <sub>{spanChildren}</sub>;
    }

    if (text.superscript) {
        spanChildren = <sup>{spanChildren}</sup>;
    }

    if (text.underlined) {
        spanChildren = <u>{spanChildren}</u>;
    }

    return <span>{spanChildren}</span>;
};

export default defaultRenderText;
