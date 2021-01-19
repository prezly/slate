import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './ListItemText.scss';

const ListItemText: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    ...props
}) => (
    <div className={classNames('prezly-slate-list-item-text', className)} {...props}>
        {children}
    </div>
);

export default ListItemText;
