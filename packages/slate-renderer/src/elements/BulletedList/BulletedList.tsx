import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './BulletedList.scss';

const BulletedList: FunctionComponent<HTMLAttributes<HTMLUListElement>> = ({
    children,
    className,
    ...props
}) => (
    <ul className={classNames('prezly-slate-bulleted-list', className)} {...props}>
        {children}
    </ul>
);

export default BulletedList;
