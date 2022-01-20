import classNames from 'classnames';
import type { HTMLAttributes, MouseEventHandler, Ref } from 'react';
import React, { forwardRef } from 'react';

import { Add } from '#icons';

import './Button.scss';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
    onClick: MouseEventHandler<HTMLButtonElement>;
    open?: boolean;
    variant?: 'default' | 'green';
}

export const Button = forwardRef<HTMLButtonElement, Props>(
    ({ className, open, onClick, variant = 'default', ...props }, ref: Ref<HTMLButtonElement>) => (
        <button
            {...props}
            className={classNames('editor-v4-floating-container-button', className, {
                'editor-v4-floating-container-button--open': open,
                'editor-v4-floating-container-button--variant-green': variant === 'green',
            })}
            onMouseDown={(event) => {
                // We cannot use `onClick` because the button captures focus,
                // causing the Slate editor to lose focus.
                event.preventDefault();
                event.stopPropagation();
                onClick(event);
            }}
            ref={ref}
            tabIndex={-1}
            type="button"
        >
            <Add className="editor-v4-floating-container-button__icon" />
        </button>
    ),
);
