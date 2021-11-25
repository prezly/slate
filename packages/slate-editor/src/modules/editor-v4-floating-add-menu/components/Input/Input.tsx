import classNames from 'classnames';
import type { FunctionComponent, InputHTMLAttributes } from 'react';
import React from 'react';

import './Input.scss';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange: (value: string) => void;
    value: string;
}

const Input: FunctionComponent<Props> = ({ className, onChange, value, ...props }) => {
    return (
        <input
            {...props}
            className={classNames('editor-v4-floating-menu-input', className)}
            onChange={(event) => onChange(event.target.value)}
            type="text"
            value={value}
        />
    );
};

export default Input;
