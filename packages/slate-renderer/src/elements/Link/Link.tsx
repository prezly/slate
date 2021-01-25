import { LinkNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { AnchorHTMLAttributes, FunctionComponent } from 'react';

import './Link.scss';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    node: LinkNode;
}

const Link: FunctionComponent<Props> = ({ children, className, node, ...props }) => (
    <a className={classNames('prezly-slate-link', className)} href={node.href} {...props}>
        {children}
    </a>
);

export default Link;
