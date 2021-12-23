import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

import type { Theme } from '#modules/themes';

export interface Props {
    flex?: boolean;
    visibility?: Theme;
}

export const ButtonGroup: FunctionComponent<Props> = ({ children, flex, visibility }) => (
    <div
        className={classNames('editor-menu__button-group', {
            'editor-menu__button-group--flex': flex,
        })}
        data-theme-visibility={visibility}
    >
        {children}
    </div>
);
