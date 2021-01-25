import { HeadingNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Heading1.scss';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    node: HeadingNode;
}

const Heading1: FunctionComponent<Props> = ({ children, className, node, ...props }) => (
    <h1 className={classNames('prezly-slate-heading-1', className)} {...props}>
        {children}
    </h1>
);

export default Heading1;
