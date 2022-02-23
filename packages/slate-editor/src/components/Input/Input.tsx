import classNames from 'classnames';
import * as React from 'react';
import type { InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (newValue: string) => void;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function Input({ className, icon: Icon, onChange, ...attributes }: InputProps) {
    return (
        <label className={styles.wrapper}>
            <input
                {...attributes}
                className={classNames(className, styles.input, {
                    [styles['with-icon']]: Icon !== undefined,
                })}
                onChange={(e) => onChange(e.currentTarget.value)}
            />
            {Icon && <Icon className={styles.icon} />}
        </label>
    );
}
