import classNames from 'classnames';
import type { ButtonHTMLAttributes, FunctionComponent } from 'react';
import React from 'react';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    variant?: 'default' | 'danger';
}

export const Button: FunctionComponent<Props> = ({
    active,
    className,
    type = 'button',
    variant = 'default',
    ...props
}) => (
    <button
        className={classNames('editor-floating-menu__button', className, {
            'editor-floating-menu__button--danger': variant === 'danger',
            'editor-floating-menu__button--active': active,
        })}
        // eslint-disable-next-line react/button-has-type
        type={type}
        {...props}
    />
);
