import React, { ReactNode } from 'react';

import { RenderText } from './types';

const DefaultRenderText: RenderText = ({
    bold,
    italic,
    subscript,
    superscript,
    text,
    underlined,
}) => {
    let spanChildren: ReactNode = text;

    if (bold) {
        spanChildren = <strong>{spanChildren}</strong>;
    }

    if (italic) {
        spanChildren = <em>{spanChildren}</em>;
    }

    if (subscript) {
        spanChildren = <sub>{spanChildren}</sub>;
    }

    if (superscript) {
        spanChildren = <sup>{spanChildren}</sup>;
    }

    if (underlined) {
        spanChildren = <u>{spanChildren}</u>;
    }

    return <>{spanChildren}</>;
};

export default DefaultRenderText;
