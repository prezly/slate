import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import { Theme } from '../../modules/editor-v4';

export interface Props {
    flex?: boolean;
    theme?: Theme;
}

export const ButtonGroup: FunctionComponent<Props> = ({ children, flex, theme }) => (
    <div
        className={classNames('editor-menu__button-group', {
            'editor-menu__button-group--flex': flex,
            'editor-menu__button-group--classic': theme === Theme.CLASSIC,
            'editor-menu__button-group--dark': theme === Theme.DARK,
        })}
    >
        {children}
    </div>
);
