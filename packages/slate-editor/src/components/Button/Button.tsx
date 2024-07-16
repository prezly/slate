import classNames from 'classnames';
import * as React from 'react';

import { HStack } from '#components';

import styles from './Button.module.scss';

interface ButtonBaseProps {
    variant?: 'primary' | 'secondary' | 'clear' | 'underlined';
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    round?: boolean;
    disabled?: boolean;
    size?: 'tiny' | 'small' | 'medium';
}

interface AsButtonProps extends ButtonBaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'submit';
}

interface AsLinkProps extends ButtonBaseProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
    type?: 'link';
}

type ButtonProps = AsButtonProps | AsLinkProps;

export function Button({
    variant,
    icon: Icon,
    iconPosition,
    fullWidth,
    type,
    round,
    disabled,
    children,
    size,
    ...attributes
}: React.PropsWithChildren<ButtonProps>) {
    const Component = type === 'link' ? 'a' : 'button';

    const iconProps: React.SVGProps<SVGSVGElement> = {
        className: styles['icon-wrapper'],
    };

    return React.createElement<React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>>(
        Component,
        {
            ...attributes,
            disabled,
            onClick: disabled
                ? (e) => {
                      e.preventDefault();
                  }
                : attributes.onClick,
            className: classNames(attributes.className, styles.button, {
                [styles['button--clear']]: variant === 'clear',
                [styles['button--primary']]: variant === 'primary',
                [styles['button--secondary']]: variant === 'secondary',
                [styles['button--underlined']]: variant === 'underlined',
                [styles['button--full-width']]: fullWidth,
                [styles['button--round']]: round,
                [styles['button--tiny']]: size === 'tiny',
                [styles['button--small']]: size === 'small',
                [styles['disabled']]: disabled,
            }),
            type: type !== 'link' ? type : undefined,
        },
        <HStack spacing="1" verticalAligning="center">
            {Icon && (iconPosition === 'left' || iconPosition === undefined) && (
                <Icon {...iconProps} />
            )}
            {children && <span className={styles['button-text']}>{children}</span>}
            {Icon && iconPosition === 'right' && <Icon {...iconProps} />}
        </HStack>,
    );
}
