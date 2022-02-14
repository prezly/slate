import * as React from 'react';

import type { OptionsGroupOption, ChooseOptionProps } from './Option';
import { ChooseOption } from './Option';
import styles from './OptionsGroup.module.scss';

interface OptionsGroupCommon<T extends string> {
    name: string;
    options: OptionsGroupOption<T>[];
    columns?: number;
}

type OptionsGroupProps<T extends string> = OptionsGroupCommon<T> &
    Omit<ChooseOptionProps<T>, 'option'>;

export function OptionsGroup<T extends string>(props: OptionsGroupProps<T>) {
    const totalColumns = props.columns ?? props.options.length;

    return (
        <div
            style={{ gridTemplateColumns: `repeat(${totalColumns}, 1fr)` }}
            className={styles['choose-group']}
        >
            {props.options.map((o) => (
                <ChooseOption
                    key={o.value}
                    name={props.name}
                    option={o}
                    onChange={props.onChange}
                    selected={props.selected}
                />
            ))}
        </div>
    );
}
