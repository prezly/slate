import classNames from 'classnames';
import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';

export interface Props {
    children: ReactNode;
    flex?: boolean;
}

export const ButtonGroup: FunctionComponent<Props> = ({ children, flex }) => (
    <div
        className={classNames('editor-menu__button-group', {
            'editor-menu__button-group--flex': flex,
        })}
    >
        {children}
    </div>
);
