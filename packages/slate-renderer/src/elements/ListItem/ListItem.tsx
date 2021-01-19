import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './ListItem.scss';

const ListItem: FunctionComponent<HTMLAttributes<HTMLLIElement>> = ({
    children,
    className,
    ...props
}) => (
    <li className={classNames('prezly-slate-list-item', className)} {...props}>
        {children}
    </li>
);

export default ListItem;
