import classNames from 'classnames';
import { uniqueId } from 'lodash-es';
import * as React from 'react';


import styles from './OptionsGroup.module.scss';

export interface OptionProps<T extends string> {
    name: string;
    onChange: (value: T) => void;
    label: string;
    value: T;
    checked: boolean;
    icon?: React.ComponentType<{ isActive: boolean }>;
    disabled?: boolean;
    variantClassName?: string;
}

export function Option<T extends string>(props: OptionProps<T>) {
    const id = React.useMemo(() => uniqueId(props.name), [props.name]);

    return (
        <span className={classNames(styles.option, props.variantClassName)}>
            <input
                id={id}
                className={styles['hidden-input']}
                name={props.name}
                type="radio"
                checked={props.checked}
                onChange={() => props.onChange(props.value)}
                disabled={props.disabled}
            />
            <label htmlFor={id} className={classNames(styles.label, props.variantClassName)}>
                {props.icon && <props.icon isActive={props.checked} />}

                <span className={classNames(styles['label-text'], props.variantClassName)}>
                    {props.label}
                </span>
            </label>
        </span>
    );
}
