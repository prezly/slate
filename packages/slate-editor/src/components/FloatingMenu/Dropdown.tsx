import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { Dropdown as BootstrapDropdown, DropdownProps, MenuItem } from 'react-bootstrap';

import './Dropdown.scss';
import { Option } from './types';

export interface Props<Value extends string> extends Omit<DropdownProps, 'onChange'> {
    onChange: (value: Value) => void;
    options: Option<Value>[];
    richTextFormattingOptions?: boolean;
    value?: Value;
}

const Dropdown = <Value extends string = string>({
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
            className={classNames('floating-menu-dropdown', className, {
                'floating-menu-dropdown--rich-text-formatting-options': richTextFormattingOptions,
            })}
            onSelect={handleSelect}
        >
            <BootstrapDropdown.Toggle>{selectedOption?.label}</BootstrapDropdown.Toggle>
            <BootstrapDropdown.Menu>
                {visibleOptions.map((option) => (
                    <MenuItem
                        className="floating-menu-dropdown__menu-item"
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

export default Dropdown;
