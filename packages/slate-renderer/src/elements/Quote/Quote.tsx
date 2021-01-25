import { QuoteNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Quote.scss';

interface Props extends HTMLAttributes<HTMLQuoteElement> {
    node: QuoteNode;
}

const Quote: FunctionComponent<Props> = ({ children, className, node, ...props }) => (
    <blockquote className={classNames('prezly-slate-quote', className)} {...props}>
        {children}
    </blockquote>
);

export default Quote;
