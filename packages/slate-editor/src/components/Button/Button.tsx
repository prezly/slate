import type { SelectAfterPrefix } from '@prezly/slate-editor/type-utils';
import classNames from 'classnames';
import * as React from 'react';

import { HStack } from '#components';

import styles from './Button.module.scss';

interface ButtonBaseProps {
    variant?: 'clear';
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    round?: boolean;
    disabled?: boolean;
    transparent?: SelectAfterPrefix<keyof typeof styles, 'transparent-'>;
}

interface AsButtonProps extends ButtonBaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'button';
}

interface AsLinkProps extends ButtonBaseProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
    type?: 'link';
}

type ButtonProps = AsButtonProps | AsLinkProps;

export function Button({
    variant,
    Icon,
    iconPosition,
    fullWidth,
    type,
    round,
    disabled,
    children,
    transparent,
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
            className: classNames(styles.button, {
                [styles['button--clear']]: variant === 'clear',
                [styles['button--full-width']]: fullWidth,
                [styles['button--round']]: round,
                [styles['button--disabled']]: disabled,
                [styles['transparent-0-5']]: transparent === '0-5',
            }),
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
