import classNames from 'classnames';
import type { ButtonHTMLAttributes, ChangeEvent, InputHTMLAttributes } from 'react';
import * as React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { Link, Search, WarningTriangle } from '#icons';
import { mergeRefs, useFunction } from '#lib';

import { LoadingIndicator } from '../LoadingIndicator';

import { ClearButton } from './ClearButton';
import styles from './Input.module.scss';

export interface Props
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSubmit'> {
    value: string;
    onChange: (newValue: string, valid: boolean) => void;
    onClear?: () => void;
    icon?:
        | React.ComponentType<React.SVGProps<SVGSVGElement>>
        | 'link'
        | 'search'
        | null
        | undefined;
    loading?: boolean;
    button?:
        | false
        | (ButtonHTMLAttributes<HTMLButtonElement> & {
              text?: string;
          });
    required?: boolean;
    withSuggestions?: boolean | 'above' | 'below';
}

export const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            autoFocus,
            button = false,
            children: suggestions,
            className,
            disabled = false,
            icon,
            loading = false,
            onChange,
            onClear,
            onBlur,
            onFocus,
            pattern,
            required = false,
            value,
            withSuggestions = false,
            ...attributes
        },
        forwardedRef,
    ) => {
        const input = useRef<HTMLInputElement>(null);

        const [valid, setValid] = useState(true);
        const [focused, setFocused] = useState(false);

        const isEmpty = !value.trim();
        const withSuggestionsAbove = suggestions && withSuggestions === 'above';
        const withSuggestionsBelow =
            suggestions && (withSuggestions === true || withSuggestions === 'below');

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
                    [styles.loading]: loading,
                    [styles.withButton]: Boolean(button),
                    [styles.withClearButton]: Boolean(onClear),
                    [styles.withIcon]: Boolean(icon),
                    [styles.withSuggestionsAbove]: withSuggestionsAbove,
                    [styles.withSuggestionsBelow]: withSuggestionsBelow,
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

                    {loading && (
                        <LoadingIndicator
                            className={styles.LoadingIndicator}
                            width={16}
                            height={16}
                        />
                    )}

                    {valid && value && !loading && onClear && (
                        <ClearButton className={styles.ClearButton} onClick={onClear} />
                    )}

                    {!valid && !loading && <WarningTriangle className={styles.WarningIcon} />}
                </div>

                {button && (
                    <Button disabled={disabled || !valid || (required && isEmpty)} {...button} />
                )}

                {withSuggestions && suggestions}
            </div>
        );
    },
);

Input.displayName = 'Input';

function Icon({ icon: Component }: Required<Pick<Props, 'icon'>>) {
    if (Component === null) {
        return null;
    }
    if (Component === 'link') {
        return <Link className={styles.Icon} />;
    }
    if (Component === 'search') {
        return <Search className={styles.Icon} />;
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
