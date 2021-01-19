import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Quote.scss';

const Quote: FunctionComponent<HTMLAttributes<HTMLQuoteElement>> = ({
    children,
    className,
    ...props
}) => (
    <blockquote className={classNames('prezly-slate-quote', className)} {...props}>
        {children}
    </blockquote>
);

export default Quote;
