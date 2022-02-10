import classNames from 'classnames';
import * as React from 'react';

import styles from './ChooseGroup.module.scss';

export interface ChooseGroupOption<T extends string> {
    label: string;
    value: T;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement> & { isActive: boolean }>;
}

interface Choose<T> {
    selected?: T;
    onChange?: (value: T | undefined) => void;
}

export interface CheckboxChoose<T extends string> extends Choose<(T | undefined)[]> {
    type: 'checkbox';
}

export interface RadioChoose<T extends string> extends Choose<T> {
    type: 'radio';
}

type ChooseOptionProps<T extends string> = (CheckboxChoose<T> | RadioChoose<T>) & {
    name: string;
    option: ChooseGroupOption<T>;
    allSelected: Set<T | undefined>;
};

export function ChooseOption<T extends string>(props: ChooseOptionProps<T>) {
    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (props.type === 'checkbox') {
                const newSelected = new Set(props.allSelected);

                if (e.currentTarget.checked) {
                    newSelected.add(props.option.value);
                } else {
                    newSelected.delete(props.option.value);
                }

                const selectedArr = Array.from(newSelected.values());
                props.onChange?.(selectedArr);
            } else {
                props.onChange?.(props.option.value);
            }
        },
        [props.type, props.allSelected, props.option, props.onChange],
    );

    const isActive = props.allSelected.has(props.option.value);

    return (
        <label
            className={classNames(
                styles.__label,
                isActive ? styles['__label--active'] : styles['__label--inactive'],
            )}
        >
            <input
                className={styles['__hidden-input']}
                name={props.name}
                type={props.type}
                checked={isActive}
                onChange={onChange}
            />
            {props.option.Icon && <props.option.Icon isActive={isActive} />}

            <span className={styles['__label-text']}>{props.option.label}</span>
        </label>
    );
}
