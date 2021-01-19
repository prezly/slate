import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Divider.scss';

interface Props extends HTMLAttributes<HTMLHRElement> {
    children?: never;
}

const Divider: FunctionComponent<Props> = ({ className, ...props }) => (
    <hr className={classNames('prezly-slate-divider', className)} {...props} />
);

export default Divider;
