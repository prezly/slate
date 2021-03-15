import classNames from 'classnames';
import React, { AnchorHTMLAttributes, FunctionComponent } from 'react';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    className?: string;
    disabled?: boolean;
}

const Link: FunctionComponent<Props> = ({ children, className, disabled, ...props }) => (
    <a
        {...props}
        className={classNames('floating-menu__link', className, {
            'floating-menu__link--disabled': disabled,
        })}
    >
        {children}
    </a>
);

export default Link;
