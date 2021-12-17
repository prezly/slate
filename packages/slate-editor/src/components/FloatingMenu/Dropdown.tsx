import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { DropdownProps } from 'react-bootstrap';
import { Dropdown as BootstrapDropdown, MenuItem } from 'react-bootstrap';

import './Dropdown.scss';
import type { Option } from './types';

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
            className={classNames('editor-floating-menu-dropdown', className, {
                'editor-floating-menu-dropdown--rich-text-formatting-options':
                    richTextFormattingOptions,
            })}
            onSelect={handleSelect}
        >
            <BootstrapDropdown.Toggle>{selectedOption?.label}</BootstrapDropdown.Toggle>
            <BootstrapDropdown.Menu>
                {visibleOptions.map((option) => (
                    <MenuItem
                        className={classNames('editor-floating-menu-dropdown__menu-item', {
                            'editor-floating-menu-dropdown__menu-item--selected':
                                option.value === value,
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

export default Dropdown;
