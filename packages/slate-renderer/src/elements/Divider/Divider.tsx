import { DividerNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Divider.scss';

interface Props extends HTMLAttributes<HTMLHRElement> {
    children?: never;
    node: DividerNode;
}

const Divider: FunctionComponent<Props> = ({ className }) => (
    <hr className={classNames('prezly-slate-divider', className)} />
);

export default Divider;
