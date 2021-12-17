import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';

export interface Props extends Partial<LinkProps> {
    className?: string;
    disabled?: boolean;
    href: string;
}

const SpaLink: FunctionComponent<Props> = ({ children, className, disabled, href, ...props }) => (
    <Link
        className={classNames('editor-floating-menu__link', className, {
            'editor-floating-menu__link--disabled': disabled,
        })}
        to={href}
        {...props}
    >
        {children}
    </Link>
);

export default SpaLink;
