import React, { FunctionComponent, MouseEventHandler } from 'react';

import { FloatingMenu } from 'components';

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
        <FloatingMenu.Button
            active={isActive}
            onMouseDown={handleClick}
            title={title}
            variant={variant}
        >
            {children}
        </FloatingMenu.Button>
    );
};

export default MenuButton;
