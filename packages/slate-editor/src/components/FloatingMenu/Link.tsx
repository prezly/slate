import classNames from 'classnames';
import type { AnchorHTMLAttributes, FunctionComponent } from 'react';
import * as React from 'react';

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
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
