import classNames from 'classnames';
import * as React from 'react';

import { HStack } from '#components';

import styles from './Button.module.scss';

interface ButtonBaseProps {
    variant: 'clear';
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    round?: boolean;
}

interface AsButtonProps extends ButtonBaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'button';
}

interface AsLinkProps extends ButtonBaseProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
    type: 'link';
}

type ButtonProps = AsButtonProps | AsLinkProps;

export function Button(props: React.PropsWithChildren<ButtonProps>) {
    const { variant, Icon, iconPosition, fullWidth, type, ...rest } = props;
    const Component = type === 'link' ? 'a' : 'button';

    const iconProps: React.SVGProps<SVGSVGElement> = {
        className: styles['icon-wrapper'],
    };

    return React.createElement(
        Component,
        {
            ...rest,
            className: classNames(styles.button, {
                [styles['button--clear']]: props.variant === 'clear',
                [styles['button--full-width']]: props.fullWidth,
                [styles['button--round']]: props.round,
            }),
        },
        <HStack spacing="1" verticalAligning="center">
            {props.Icon && (iconPosition === 'left' || iconPosition === undefined) && (
                <props.Icon {...iconProps} />
            )}
            {props.children && <span className={styles['button-text']}>{props.children}</span>}
            {props.Icon && iconPosition === 'right' && <props.Icon {...iconProps} />}
        </HStack>,
    );
}
