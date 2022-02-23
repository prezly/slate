import classNames from 'classnames';
import * as React from 'react';

import styles from './Input.module.scss';

interface InputProps {
    value: string;
    onChange: (newValue: string) => void;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    placeholder?: string;
    disabled?: boolean;
}

export function Input(props: InputProps) {
    return (
        <label className={styles.wrapper}>
            <input
                className={classNames(styles.input, {
                    [styles['with-icon']]: props.icon !== undefined,
                })}
                value={props.value}
                onChange={(e) => props.onChange(e.currentTarget.value)}
                placeholder={props.placeholder}
                disabled={props.disabled}
            />
            {props.icon && <props.icon className={styles.icon} />}
        </label>
    );
}
