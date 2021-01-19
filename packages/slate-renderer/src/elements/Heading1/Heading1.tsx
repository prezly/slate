import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Heading1.scss';

const Heading1: FunctionComponent<HTMLAttributes<HTMLHeadingElement>> = ({
    children,
    className,
    ...props
}) => (
    <h1 className={classNames('prezly-slate-heading-1', className)} {...props}>
        {children}
    </h1>
);

export default Heading1;
