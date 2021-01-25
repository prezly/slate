import { ListItemTextNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './ListItemText.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    node: ListItemTextNode;
}

const ListItemText: FunctionComponent<Props> = ({ children, className, node, ...props }) => (
    <div className={classNames('prezly-slate-list-item-text', className)} {...props}>
        {children}
    </div>
);

export default ListItemText;
