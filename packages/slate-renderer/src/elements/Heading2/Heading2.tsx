import { HeadingNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Heading2.scss';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    node: HeadingNode;
}

const Heading2: FunctionComponent<Props> = ({ children, className, node, ...props }) => (
    <h2 className={classNames('prezly-slate-heading-2', className)} {...props}>
        {children}
    </h2>
);

export default Heading2;
