import type { FunctionComponent, MouseEventHandler } from 'react';
import React from 'react';

import { Menu } from '../../../components';

interface Props {
    isActive?: boolean;
    onClick: MouseEventHandler;
    title: string;
    variant?: 'danger';
}

const MenuButton: FunctionComponent<Props> = ({ children, isActive, onClick, title, variant }) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        onClick(event);
    };

    return (
        <Menu.Button
            active={isActive}
            onMouseDown={handleClick}
            title={title}
            variant={variant}
        >
            {children}
        </Menu.Button>
    );
};

export default MenuButton;
