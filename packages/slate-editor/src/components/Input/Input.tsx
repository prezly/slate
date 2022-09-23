import classNames from 'classnames';
import * as React from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

import { WarningTriangle } from '#icons';
import { useFunction } from '#lib';

import styles from './Input.module.scss';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (newValue: string, valid: boolean) => void;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function Input({ className, icon: Icon, onChange, ...attributes }: Props) {
    const handleChange = useFunction((event: ChangeEvent<HTMLInputElement>) => {
        const { value, validity } = event.currentTarget;
        onChange(value, validity.valid);
    });

    return (
        <label className={styles.Wrapper}>
            <input
                {...attributes}
                className={classNames(className, styles.Input, {
                    [styles.withIcon]: Icon !== undefined,
                })}
                onChange={handleChange}
            />
            {Icon && <Icon className={styles.Icon} />}

            <WarningTriangle className={styles.InvalidIcon} />
        </label>
    );
}
