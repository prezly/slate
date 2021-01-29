import { MentionNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: never;
    node: MentionNode;
}

const Mention: FunctionComponent<Props> = ({ className, node, ...props }) => (
    <span className={classNames('prezly-slate-mention', className)} {...props}>
        {node.user.name}
    </span>
);

export default Mention;
