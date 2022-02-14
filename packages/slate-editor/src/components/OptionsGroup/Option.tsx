import classNames from 'classnames';
import { uniqueId } from 'lodash';
import * as React from 'react';

import styles from './OptionsGroup.module.scss';

export interface OptionsGroupOption<T extends string> {
    label: string;
    value: T;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement> & { isActive: boolean }>;
    disabled?: boolean;
}

export interface ChooseOptionProps<T extends string> {
    name: string;
    option: OptionsGroupOption<T>;
    selected?: T;
    onChange: (value: T | undefined) => void;
}

export function ChooseOption<T extends string>(props: ChooseOptionProps<T>) {
    const onChange = React.useCallback(() => {
        props.onChange?.(props.option.value);
    }, [props.option, props.onChange]);

    const isActive = props.selected === props.option.value;

    const id = React.useMemo(() => uniqueId(props.name), [props.name]);

    return (
        <span>
            <input
                id={id}
                className={styles['hidden-input']}
                name={props.name}
                type="radio"
                checked={isActive}
                onChange={onChange}
                disabled={props.option.disabled}
            />
            <label htmlFor={id} className={classNames(styles.label)}>
                {props.option.Icon && <props.option.Icon isActive={isActive} />}
                <span className={styles['label-text']}>{props.option.label}</span>
            </label>
        </span>
    );
}
