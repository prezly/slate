import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface Props {
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
