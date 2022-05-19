import classNames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';
import React from 'react';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    variant?: 'default' | 'primary' | 'success' | 'danger';
}

export function Button({
    active,
    className,
    type = 'button',
    variant = 'default',
    ...props
}: Props) {
    return (
        <button
            className={classNames('editor-menu__button', className, {
                'editor-menu__button--danger': variant === 'danger',
                'editor-menu__button--primary': variant === 'primary',
                'editor-menu__button--success': variant === 'success',
                'editor-menu__button--active': active,
            })}
            // eslint-disable-next-line react/button-has-type
            type={type}
            {...props}
        />
    );
}
