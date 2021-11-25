import type { FunctionComponent, MouseEventHandler } from 'react';
import React from 'react';

import { FloatingMenu } from '../../../components';
import type { ElementType, MarkType } from '../types';

interface Props {
    isActive?: boolean;
    onClick: (parameters: { type: ElementType | MarkType }) => void;
    type: ElementType | MarkType;
}

const MenuButton: FunctionComponent<Props> = ({ children, isActive, onClick, type }) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        onClick({ type });
    };

    return (
        <FloatingMenu.Button active={isActive} onMouseDown={handleClick}>
            {children}
        </FloatingMenu.Button>
    );
};

export default MenuButton;
