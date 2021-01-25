// @ts-ignore
if (typeof window !== 'undefined') {
    // @ts-ignore
    window.React1 = require('react');
}

import { ParagraphNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Paragraph.scss';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    node: ParagraphNode;
}

const Paragraph: FunctionComponent<Props> = ({ children, className, node, ...props }) => (
    <p className={classNames('prezly-slate-paragraph', className)} {...props}>
        {children}
    </p>
);

export default Paragraph;
