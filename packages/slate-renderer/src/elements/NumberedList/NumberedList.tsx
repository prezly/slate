import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './NumberedList.scss';

const NumberedList: FunctionComponent<HTMLAttributes<HTMLOListElement>> = ({
    children,
    className,
    ...props
}) => (
    <ol className={classNames('prezly-slate-numbered-list', className)} {...props}>
        {children}
    </ol>
);

export default NumberedList;
