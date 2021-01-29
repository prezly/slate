import { PlaceholderNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: never;
    node: PlaceholderNode;
    values: Record<PlaceholderNode['key'], string>;
}

const Placeholder: FunctionComponent<Props> = ({ className, node, values, ...props }) => (
    <span className={classNames('prezly-slate-placeholder', className)} {...props}>
        {values[node.key]}
    </span>
);

export default Placeholder;
