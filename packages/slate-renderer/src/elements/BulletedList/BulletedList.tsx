import { ListNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './BulletedList.scss';

interface Props extends HTMLAttributes<HTMLUListElement> {
    node: ListNode;
}

const BulletedList: FunctionComponent<Props> = ({ children, className, ...props }) => (
    <ul className={classNames('prezly-slate-bulleted-list', className)} {...props}>
        {children}
    </ul>
);

export default BulletedList;
