import * as React from 'react';

import type { OptionProps } from './Option';
import { Option } from './Option';
import styles from './OptionsGroup.module.scss';

export type OptionsGroupOption<T extends string> = Pick<
    OptionProps<T>,
    'label' | 'value' | 'icon' | 'disabled'
>;

interface OptionsGroupProps<T extends string> {
    name: string;
    options: OptionsGroupOption<T>[];
    columns?: number;
    selectedValue: T | undefined;
    onChange: (value: T) => void;
    disabled?: boolean;
}

export function OptionsGroup<T extends string>(props: OptionsGroupProps<T>) {
    const totalColumns = props.columns ?? props.options.length;

    return (
        <div
            style={{ gridTemplateColumns: `repeat(${totalColumns}, 1fr)` }}
            className={styles['choose-group']}
        >
            {props.options.map((o) => (
                <Option
                    key={o.value}
                    name={props.name}
                    onChange={props.onChange}
                    checked={props.selectedValue === o.value}
                    label={o.label}
                    value={o.value}
                    icon={o.icon}
                    disabled={o.disabled ?? props.disabled}
                />
            ))}
        </div>
    );
}
