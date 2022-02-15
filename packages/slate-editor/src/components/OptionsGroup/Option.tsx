import classNames from 'classnames';
import * as React from 'react';

import { uniqueId } from '#lodash';

import styles from './OptionsGroup.module.scss';

export interface OptionProps<T extends string> {
    name: string;
    onChange: (value: T) => void;
    label: string;
    value: T;
    checked: boolean;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement> & { isActive: boolean }>;
    disabled?: boolean;
}

export function Option<T extends string>(props: OptionProps<T>) {
    const id = React.useMemo(() => uniqueId(props.name), [props.name]);

    return (
        <span>
            <input
                id={id}
                className={styles['hidden-input']}
                name={props.name}
                type="radio"
                checked={props.checked}
                onChange={() => props.onChange(props.value)}
                disabled={props.disabled}
            />
            <label htmlFor={id} className={classNames(styles.label)}>
                {props.icon && <props.icon isActive={props.checked} />}
                <span className={styles['label-text']}>{props.label}</span>
            </label>
        </span>
    );
}
