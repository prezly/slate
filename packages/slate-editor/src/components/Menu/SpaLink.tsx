import classNames from 'classnames';
import React from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';

export interface Props extends Partial<LinkProps> {
    className?: string;
    disabled?: boolean;
    href: string;
}

export function SpaLink({ children, className, disabled, href, ...props }: Props) {
    return (
        <Link
            className={classNames('editor-menu__link', className, {
                'editor-menu__link--disabled': disabled,
            })}
            to={href}
            {...props}
        >
            {children}
        </Link>
    );
}
