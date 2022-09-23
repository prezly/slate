import classNames from 'classnames';
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { WarningTriangle } from '#icons';
import { useFunction } from '#lib';

import styles from './Input.module.scss';

export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (newValue: string, valid: boolean) => void;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function Input({
    className,
    disabled,
    icon: Icon,
    onChange,
    onBlur,
    onFocus,
    value,
    ...attributes
}: Props) {
    const input = useRef<HTMLInputElement>(null);

    const [valid, setValid] = useState(true);
    const [focused, setFocused] = useState(false);

    const handleChange = useFunction((event: ChangeEvent<HTMLInputElement>) => {
        const { value, validity } = event.currentTarget;
        setValid(validity.valid);
        onChange(value, validity.valid);
    });

    useEffect(() => {
        setValid(input.current?.validity.valid ?? true);
    }, [value]);

    return (
        <label
            className={classNames(styles.InputBox, {
                [styles.disabled]: disabled,
                [styles.invalid]: !valid,
                [styles.focused]: focused,
                [styles.withIcon]: Icon !== undefined,
            })}
        >
            <input
                {...attributes}
                ref={input}
                className={classNames(className, styles.Input)}
                disabled={disabled}
                value={value}
                onChange={handleChange}
                onFocus={(event) => {
                    setFocused(true);
                    onFocus?.(event);
                }}
                onBlur={(event) => {
                    setFocused(false);
                    onBlur?.(event);
                }}
            />
            {Icon && <Icon className={styles.Icon} />}

            <WarningTriangle className={styles.WarningIcon} />
        </label>
    );
}
