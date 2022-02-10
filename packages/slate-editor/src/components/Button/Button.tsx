import classNames from 'classnames';
import * as React from 'react';

import { HStack } from '#components';

import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'clear';
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    fullWidth?: boolean;
}

export function Button(props: React.PropsWithChildren<ButtonProps>) {
    const { variant, Icon, fullWidth, ...rest } = props;

    return (
        <button
            {...rest}
            className={classNames(styles.button, {
                [styles['--clear']]: props.variant === 'clear',
                [styles['--full-width']]: props.fullWidth,
            })}
        >
            <HStack spacing="spacing-1">
                {props.Icon && <props.Icon className={styles['__icon-wrapper']} />}
                {props.children && <span>{props.children}</span>}
            </HStack>
        </button>
    );
}
