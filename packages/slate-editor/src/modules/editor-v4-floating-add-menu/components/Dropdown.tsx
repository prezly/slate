import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import { Label, MenuItem } from 'react-bootstrap';

import { noop } from '#lodash';

import type { Option } from '../types';

import './Dropdown.scss';

interface Props {
    className?: string;
    options: Option[];
    onItemClick: (option: Option) => void;
    open: boolean;
    selectedOption: Option;
}

export const Dropdown: FunctionComponent<Props> = ({
    className,
    options,
    onItemClick,
    open,
    selectedOption,
}) => (
    <div className={classNames('dropdown', 'editor-v4-floating-menu-dropdown', { open })}>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <ul
            className={classNames(
                'dropdown-menu',
                'editor-v4-floating-menu-dropdown__menu',
                className,
            )}
            onMouseDown={(event) => event.preventDefault()}
        >
            {options.length === 0 && (
                <MenuItem
                    className="editor-v4-floating-menu-dropdown__menu-item"
                    disabled
                    onClick={noop}
                >
                    Nothing found.
                </MenuItem>
            )}

            {options.map((option) => (
                <MenuItem
                    active={option === selectedOption}
                    className="editor-v4-floating-menu-dropdown__menu-item"
                    key={option.text}
                    onClick={(event) => event.preventDefault()}
                    onMouseDown={(event) => {
                        event.preventDefault();
                        onItemClick(option);
                    }}
                >
                    {option.icon}
                    {option.text}
                    {option.beta && (
                        <Label
                            bsStyle="warning"
                            className="editor-v4-floating-menu-dropdown__beta-label"
                        >
                            IN TESTING
                        </Label>
                    )}
                </MenuItem>
            ))}
        </ul>
    </div>
);
