import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import './Heading1.scss';

interface Props {
    className?: string;
}

const Heading1: FunctionComponent<Props> = ({ children, className, ...props }) => (
    <h1 className={classNames('prezly-slate-heading-1', className)} {...props}>
        {children}
    </h1>
);

export default Heading1;
