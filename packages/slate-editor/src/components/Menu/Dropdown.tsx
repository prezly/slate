import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React, { ReactNode } from 'react';
import type { DropdownProps } from 'react-bootstrap';
import { Dropdown as BootstrapDropdown, MenuItem } from 'react-bootstrap';

import './Dropdown.scss';

export interface Option<Value extends string> {
    hidden?: boolean;
    label: string;
    render?: (option: Option<Value>) => ReactNode;
    value: Value;
}

export interface Props<Value extends string> extends Omit<DropdownProps, 'onChange'> {
    onChange: (value: Value) => void;
    options: Option<Value>[];
    richTextFormattingOptions?: boolean;
    value?: Value;
}

export const Dropdown = <Value extends string = string>({
    className,
    onChange,
    options,
    richTextFormattingOptions,
    value,
    ...props
}: Props<Value>): ReturnType<FunctionComponent<Props<Value>>> => {
    const selectedOption = options.find((option) => option.value === value);
    const visibleOptions = options.filter(({ hidden }) => !hidden);

    const handleSelect = (newValue: any) => {
        if (value !== newValue) {
            // if current value is equal to selected one, do nothing,
            // this saves us a little work in the callback
            onChange(newValue as Value);
        }
    };

    return (
        <BootstrapDropdown
            {...props}
            className={classNames('editor-menu-dropdown', className, {
                'editor-menu-dropdown--rich-text-formatting-options': richTextFormattingOptions,
            })}
            onSelect={handleSelect}
        >
            <BootstrapDropdown.Toggle>{selectedOption?.label}</BootstrapDropdown.Toggle>
            <BootstrapDropdown.Menu>
                {visibleOptions.map((option) => (
                    <MenuItem
                        className={classNames('editor-menu-dropdown__menu-item', {
                            'editor-menu-dropdown__menu-item--selected': option.value === value,
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
};
