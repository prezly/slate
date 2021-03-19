import classNames from 'classnames';
import React, { forwardRef, HTMLAttributes, MouseEventHandler, Ref } from 'react';

import { Add } from 'icons';

import './Button.scss';

interface Props extends HTMLAttributes<HTMLButtonElement> {
    onClick: MouseEventHandler<HTMLButtonElement>;
    open?: boolean;
    variant?: 'default' | 'green';
}

const Button = forwardRef<HTMLButtonElement, Props>(
    ({ className, open, onClick, variant = 'default', ...props }, ref: Ref<HTMLButtonElement>) => (
        <button
            {...props}
            className={classNames('editor-v4-floating-container-button', className, {
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
            <Add
                className={classNames('editor-v4-floating-container-button__icon', {
                    'editor-v4-floating-container-button__icon--close': open,
                })}
            />
        </button>
    ),
);

export default Button;
