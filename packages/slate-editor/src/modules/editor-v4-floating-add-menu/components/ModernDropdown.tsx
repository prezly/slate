import classNames from 'classnames';
import React from 'react';
import { MenuItem } from 'react-bootstrap';

import { noop } from '#lodash';

import type { Option } from '../types';

import './ModernDropdown.scss';

interface Props<Action> {
    className?: string;
    options: Option<Action>[];
    onItemClick: (option: Option<Action>) => void;
    open: boolean;
    selectedOption: Option<Action>;
}

export function ModernDropdown<Action>({
    className,
    options,
    onItemClick,
    open,
    selectedOption,
}: Props<Action>) {
    return (
        <div
            className={classNames(
                'dropdown',
                'editor-v4-floating-menu-dropdown',
                'editor-v4-floating-menu-dropdown--modern',
                { open },
            )}
        >
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
                        <div className="editor-v4-floating-menu-dropdown__menu-item-icon">{option.icon}</div>
                        <div className="editor-v4-floating-menu-dropdown__menu-item-text">
                            <div className="editor-v4-floating-menu-dropdown__menu-item-title">{option.text}</div>
                            <div className="editor-v4-floating-menu-dropdown__menu-item-description">{option.description}</div>
                        </div>
                    </MenuItem>
                ))}
            </ul>
        </div>
    );
}
