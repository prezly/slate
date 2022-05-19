import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';

export interface Props {
    children: ReactNode;
    flex?: boolean;
}

export function ButtonGroup({ children, flex }: Props) {
    return (
        <div
            className={classNames('editor-menu__button-group', {
                'editor-menu__button-group--flex': flex,
            })}
        >
            {children}
        </div>
    );
}
