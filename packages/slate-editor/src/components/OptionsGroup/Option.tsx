import classNames from 'classnames';
import * as React from 'react';

import styles from './OptionsGroup.module.scss';

export interface OptionsGroupOption<T extends string> {
    label: string;
    value: T;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement> & { isActive: boolean }>;
}

interface Option<T> {
    selected?: T;
    onChange?: (value: T | undefined) => void;
}

export interface RadioChoose<T extends string> extends Option<T> {
    type?: 'radio';
}

type ChooseOptionProps<T extends string> = RadioChoose<T> & {
    name: string;
    option: OptionsGroupOption<T>;
    allSelected: Set<T | undefined>;
};

export function ChooseOption<T extends string>(props: ChooseOptionProps<T>) {
    const onChange = React.useCallback(() => {
        props.onChange?.(props.option.value);
    }, [props.option, props.onChange]);

    const isActive = props.allSelected.has(props.option.value);

    return (
        <label
            className={classNames(
                styles.label,
                isActive ? styles['label--active'] : styles['label--inactive'],
            )}
        >
            <input
                className={styles['hidden-input']}
                name={props.name}
                type={props.type}
                checked={isActive}
                onChange={onChange}
            />
            {props.option.Icon && <props.option.Icon isActive={isActive} />}

            <span className={styles['label-text']}>{props.option.label}</span>
        </label>
    );
}
