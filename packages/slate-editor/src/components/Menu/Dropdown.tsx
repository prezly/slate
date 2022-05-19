import classNames from 'classnames';
import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';
import type { DropdownProps } from 'react-bootstrap';
import { Dropdown as BootstrapDropdown, MenuItem } from 'react-bootstrap';

import styles from './Dropdown.module.scss';

export namespace Dropdown {
    export interface Option<Value extends string> {
        hidden?: boolean;
        label: string;
        render?: (option: Option<Value>) => ReactNode;
        value: Value;
    }

    export interface Props<Value extends string> extends Omit<DropdownProps, 'onChange'> {
        onChange: (value: Value) => void;
        options: Option<Value>[];
        value?: Value;
    }
}

export function Dropdown<Value extends string = string>({
    className,
    onChange,
    options,
    value,
    ...props
}: Dropdown.Props<Value>): ReturnType<FunctionComponent<Dropdown.Props<Value>>> {
    const selectedOption = options.find((option) => option.value === value);
    const visibleOptions = options.filter(({ hidden }) => !hidden);

    function handleSelect(newValue: any) {
        if (value !== newValue) {
            // if current value is equal to selected one, do nothing,
            // this saves us a little work in the callback
            onChange(newValue as Value);
        }
    }

    return (
        <BootstrapDropdown
            {...props}
            className={classNames(styles.Dropdown, className)}
            onSelect={handleSelect}
        >
            <BootstrapDropdown.Toggle>{selectedOption?.label}</BootstrapDropdown.Toggle>
            <BootstrapDropdown.Menu>
                {visibleOptions.map((option) => (
                    <MenuItem
                        className={classNames(styles.MenuItem, {
                            [styles.selected]: option.value === value,
                        })}
                        eventKey={option.value}
                        key={option.value}
                    >
                        {option.render ? option.render(option) : option.label}
                    </MenuItem>
                ))}
            </BootstrapDropdown.Menu>
        </BootstrapDropdown>
    );
}
