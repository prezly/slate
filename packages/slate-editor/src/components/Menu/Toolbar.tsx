import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

import { Theme, useToolbarsTheme } from '#modules/themes';

export interface Props {
    className?: string;
}

export const Toolbar: FunctionComponent<Props> = ({ children, className }) => {
    const theme = useToolbarsTheme();

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={classNames('editor-menu', className, {
                'editor-menu--classic-theme': theme === Theme.CLASSIC,
                'editor-menu--dark-theme': theme === Theme.DARK,
            })}
            onMouseDown={(event) => event.preventDefault()}
        >
            {children}
        </div>
    );
};
