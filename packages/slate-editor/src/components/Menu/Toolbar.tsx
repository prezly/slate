import classNames from 'classnames';
import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';

export interface Props {
    children: ReactNode;
    className?: string;
}

export const Toolbar: FunctionComponent<Props> = ({ children, className }) => {
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={classNames('editor-menu', className)}
            onMouseDown={(event) => event.preventDefault()}
        >
            {children}
        </div>
    );
};
