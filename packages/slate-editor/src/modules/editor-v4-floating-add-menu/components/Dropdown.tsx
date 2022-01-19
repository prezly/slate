import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import { Label, MenuItem } from 'react-bootstrap';

import { noop } from '#lodash';

import { betaLastComparator } from '../lib';
import type { Option } from '../types';

import './Dropdown.scss';

interface Props {
    className?: string;
    components: Option[];
    currentIndex: number;
    onItemClick: (index: number) => void;
    open: boolean;
}

export const Dropdown: FunctionComponent<Props> = ({
    className,
    components,
    currentIndex,
    onItemClick,
    open,
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
            {components.length === 0 && (
                <MenuItem
                    className="editor-v4-floating-menu-dropdown__menu-item"
                    disabled
                    onClick={noop}
                >
                    Nothing found.
                </MenuItem>
            )}

            {components.sort(betaLastComparator).map(({ beta, icon, text }, index) => (
                <MenuItem
                    active={index === currentIndex}
                    className="editor-v4-floating-menu-dropdown__menu-item"
                    key={text}
                    onClick={(event) => event.preventDefault()}
                    onMouseDown={(event) => {
                        event.preventDefault();
                        onItemClick(index);
                    }}
                >
                    {icon}
                    {text}
                    {beta && (
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
