import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import * as React from 'react';

export interface Props {
    flex?: boolean;
}

const ButtonGroup: FunctionComponent<Props> = ({ children, flex }) => (
    <div
        className={classNames('floating-menu__button-group', {
            'floating-menu__button-group--flex': flex,
        })}
    >
        {children}
    </div>
);

export default ButtonGroup;
