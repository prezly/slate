import { ParagraphNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import { stringifyReactNode } from '../../lib';

import './Paragraph.scss';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    node: ParagraphNode;
}

const Paragraph: FunctionComponent<Props> = ({ children, className, node, ...props }) => (
    <p className={classNames('prezly-slate-paragraph', className)} {...props}>
        {children}
        {stringifyReactNode(children).trim().length === 0 && <>&nbsp;</>}
    </p>
);

export default Paragraph;
