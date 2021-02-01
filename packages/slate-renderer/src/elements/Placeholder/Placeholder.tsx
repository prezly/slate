import { PlaceholderKey, PlaceholderNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';

interface Props<Key extends string> extends HTMLAttributes<HTMLSpanElement> {
    children?: never;
    node: PlaceholderNode<Key>;
    values: Record<Key, string>;
}

const Placeholder = <Key extends string = PlaceholderKey>({
    className,
    node,
    values,
    ...props
}: Props<Key>) => {
    const value = values[node.key];

    if (typeof value !== 'string') {
        if (process.env.NODE_ENV === 'development') {
            console.warn(
                `[@prezly/slate-renderer] Unknown Placeholder key encountered: ${node.key}`,
            );
        }

        return null;
    }

    return (
        <span className={classNames('prezly-slate-placeholder', className)} {...props}>
            {value}
        </span>
    );
};

export default Placeholder;
