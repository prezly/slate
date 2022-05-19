import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';

export interface Props {
    children: ReactNode;
    className?: string;
}

export function Toolbar({ children, className }: Props) {
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={classNames('editor-menu', className)}
            onMouseDown={(event) => event.preventDefault()}
        >
            {children}
        </div>
    );
}
