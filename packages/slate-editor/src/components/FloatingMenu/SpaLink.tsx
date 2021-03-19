import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export interface Props extends Partial<LinkProps> {
    className?: string;
    disabled?: boolean;
    href: string;
}

const SpaLink: FunctionComponent<Props> = ({ children, className, disabled, href, ...props }) => (
    <Link
        className={classNames('floating-menu__link', className, {
            'floating-menu__link--disabled': disabled,
        })}
        to={href}
        {...props}
    >
        {children}
    </Link>
);

export default SpaLink;
