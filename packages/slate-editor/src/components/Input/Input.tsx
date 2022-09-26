import classNames from 'classnames';
import type { ButtonHTMLAttributes, ChangeEvent, InputHTMLAttributes } from 'react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { WarningTriangle } from '#icons';
import { useFunction } from '#lib';

import styles from './Input.module.scss';

export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (newValue: string, valid: boolean) => void;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    button?:
        | false
        | (ButtonHTMLAttributes<HTMLButtonElement> & {
              text?: string;
          });
}

export function Input({
    button = false,
    className,
    disabled = false,
    icon: Icon,
    onChange,
    onBlur,
    onFocus,
    pattern,
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
    }, [value, pattern]);

    return (
        <div
            className={classNames(styles.Input, {
                [styles.disabled]: disabled,
                [styles.invalid]: !valid,
                [styles.focused]: focused,
                [styles.withButton]: Boolean(button),
                [styles.withIcon]: Icon !== undefined,
            })}
        >
            <div className={styles.InputBox}>
                <input
                    {...attributes}
                    ref={input}
                    className={classNames(className, styles.TextInput)}
                    disabled={disabled}
                    value={value}
                    pattern={pattern}
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
            </div>

            {button && <Button disabled={disabled} {...button} />}
        </div>
    );
}

function Button({
    className,
    children,
    text,
    ...attributes
}: Exclude<Props['button'], undefined | false>) {
    return (
        <button type="button" className={classNames(className, styles.Button)} {...attributes}>
            {text}
            {children}
        </button>
    );
}
