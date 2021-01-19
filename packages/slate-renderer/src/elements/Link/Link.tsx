import classNames from 'classnames';
import React, { AnchorHTMLAttributes, FunctionComponent } from 'react';

import './Link.scss';

const Link: FunctionComponent<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
    children,
    className,
    ...props
}) => (
    <a className={classNames('prezly-slate-link', className)} {...props}>
        {children}
    </a>
);

export default Link;
