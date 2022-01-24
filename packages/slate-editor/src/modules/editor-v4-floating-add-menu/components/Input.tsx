import classNames from 'classnames';
import type { InputHTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import './Input.scss';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange: (value: string) => void;
    value: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(function (
    { className, onChange, value, ...props },
    ref,
) {
    return (
        <input
            {...props}
            className={classNames('editor-v4-floating-menu-input', className)}
            onChange={(event) => onChange(event.target.value)}
            ref={ref}
            type="text"
            value={value}
        />
    );
});

Input.displayName = 'Input';
