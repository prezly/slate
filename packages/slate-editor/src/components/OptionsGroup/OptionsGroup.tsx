import * as React from 'react';

import type { OptionsGroupOption,  RadioChoose } from './Option';
import { ChooseOption } from './Option';
import styles from './OptionsGroup.module.scss';

interface OptionsGroupCommon<T extends string> {
    name: string;
    options: OptionsGroupOption<T>[];
    columns?: number;
}

type OptionsGroupProps<T extends string> = OptionsGroupCommon<T> &
    ( RadioChoose<T>);

export function OptionsGroup<T extends string>(props: OptionsGroupProps<T>) {
    const allSelected = React.useMemo(
        () => new Set( [props.selected]),
        [props.selected],
    );

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
                    type={props.type}
                    option={o}
                    allSelected={allSelected}
                    onChange={props.onChange}
                    selected={props.selected}
                />
            ))}
        </div>
    );
}
