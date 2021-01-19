import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Divider.scss';

const Divider: FunctionComponent<HTMLAttributes<HTMLHRElement>> = ({ className, ...props }) => (
    <hr className={classNames('prezly-slate-divider', className)} {...props} />
);

export default Divider;
