import classNames from 'classnames';
import type { AnchorHTMLAttributes } from 'react';
import React from 'react';

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    className?: string;
    disabled?: boolean;
}

export function Link({ children, className, disabled, ...props }: Props) {
    return (
        <a
            {...props}
            className={classNames('editor-menu__link', className, {
                'editor-menu__link--disabled': disabled,
            })}
        >
            {children}
        </a>
    );
}
