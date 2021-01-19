import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Heading2.scss';

const Heading2: FunctionComponent<HTMLAttributes<HTMLHeadingElement>> = ({
    children,
    className,
    ...props
}) => (
    <h2 className={classNames('prezly-slate-heading-2', className)} {...props}>
        {children}
    </h2>
);

export default Heading2;
