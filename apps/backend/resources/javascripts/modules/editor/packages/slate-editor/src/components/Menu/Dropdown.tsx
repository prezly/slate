import { Listbox } from '@headlessui/react';
import type { ListboxProps } from '@headlessui/react';
import classNames from 'classnames';
import type { ComponentType, FunctionComponent } from 'react';
import { Fragment } from 'react';
import React from 'react';

import styles from './Dropdown.module.scss';

export namespace Dropdown {
    export interface Option<Value extends string> {
        hidden?: boolean;
        label: string;
        value: Value;
    }

    export interface Props<Value extends string>
        extends Omit<ListboxProps<'div', Value, Value>, 'onChange' | 'className'> {
        onChange: (value: Value) => void;
        options: Option<Value>[];
        disabled?: boolean;
        renderOption?: ComponentType<{ option: Option<Value>; selected: boolean }>;
        value?: Value;
        variant?: 'dark' | 'light';
        className?: string;
    }
}

export function Dropdown<Value extends string = string>({
    className,
    onChange,
    options,
    disabled = false,
    renderOption = PlainLabel,
    value,
    variant = 'dark',
    ...props
}: Dropdown.Props<Value>): ReturnType<FunctionComponent<Dropdown.Props<Value>>> {
    const RenderOption = renderOption;
    const selected = options.find((option) => option.value === value);
    const visibleOptions = options.filter(({ hidden }) => !hidden);

    function handleSelect(newValue: any) {
        if (value !== newValue) {
            // if current value is equal to selected one, do nothing,
            // this saves us a little work in the callback
            onChange(newValue as Value);
        }
    }

    return (
        <Listbox
            className={classNames(styles.Dropdown, className, {
                [styles.enabled]: !disabled,
                [styles.light]: variant === 'light',
            })}
            as="div"
            {...props}
            disabled={disabled}
            value={selected}
            onChange={handleSelect}
        >
            <Listbox.Button
                className={classNames(styles.DropdownToggle, {
                    [styles.enabled]: !disabled,
                })}
            >
                {selected?.label}
                <span className={styles.Caret} />
            </Listbox.Button>
            <Listbox.Options className={styles.DropdownMenu}>
                {visibleOptions.map((option) => (
                    <Listbox.Option key={option.value} as={Fragment} value={option.value}>
                        {({ selected, active }) => (
                            <li
                                className={classNames(styles.MenuItem, {
                                    [styles.selected]: option.value === value,
                                    [styles.active]: active,
                                })}
                            >
                                <span>
                                    <RenderOption option={option} selected={selected} />
                                </span>
                            </li>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
}

function PlainLabel(props: { option: { label: string } }) {
    return <>{props.option.label}</>;
}
