import { PlaceholderNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: never;
    node: PlaceholderNode;
}

const Placeholder: FunctionComponent<Props> = ({ className, node, ...props }) => (
    <span className={classNames('prezly-slate-placeholder', className)} {...props}>
        asd
    </span>
);

export default Placeholder;
