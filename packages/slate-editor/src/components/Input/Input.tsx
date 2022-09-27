import classNames from 'classnames';
import type { ButtonHTMLAttributes, ChangeEvent, InputHTMLAttributes } from 'react';
import * as React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { Link, WarningTriangle } from '#icons';
import { mergeRefs, useFunction } from '#lib';

import styles from './Input.module.scss';

export interface Props
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSubmit'> {
    value: string;
    onChange: (newValue: string, valid: boolean) => void;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | 'link';
    button?:
        | false
        | (ButtonHTMLAttributes<HTMLButtonElement> & {
              text?: string;
          });
    required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            autoFocus,
            button = false,
            className,
            disabled = false,
            icon,
            onChange,
            onBlur,
            onFocus,
            pattern,
            required = false,
            value,
            ...attributes
        },
        forwardedRef,
    ) => {
        const input = useRef<HTMLInputElement>(null);

        const [valid, setValid] = useState(true);
        const [focused, setFocused] = useState(false);

        const isEmpty = !value.trim();

        const handleChange = useFunction((event: ChangeEvent<HTMLInputElement>) => {
            const { value, validity } = event.currentTarget;
            setValid(validity.valid);
            onChange(value, validity.valid);
        });

        useEffect(() => {
            setValid(input.current?.validity.valid ?? true);
        }, [value, pattern]);

        useEffect(() => {
            setTimeout(() => input.current?.focus(), 0);
        }, [autoFocus]);

        return (
            <div
                className={classNames(className, styles.Input, {
                    [styles.disabled]: disabled,
                    [styles.invalid]: !valid,
                    [styles.focused]: focused,
                    [styles.withButton]: Boolean(button),
                    [styles.withIcon]: Boolean(icon),
                })}
            >
                <div className={styles.InputBox}>
                    <input
                        {...attributes}
                        ref={mergeRefs(input, forwardedRef)}
                        autoFocus={autoFocus}
                        className={styles.TextInput}
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
                    {icon && <Icon icon={icon} />}

                    <WarningTriangle className={styles.WarningIcon} />
                </div>

                {button && (
                    <Button disabled={disabled || !valid || (required && isEmpty)} {...button} />
                )}
            </div>
        );
    },
);

Input.displayName = 'Input';

function Icon({ icon: Component }: Required<Pick<Props, 'icon'>>) {
    if (Component === 'link') {
        return <Link className={styles.Icon} />;
    }

    return <Component className={styles.Icon} />;
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
