import * as React from 'react';

import type { ChooseGroupOption, CheckboxChoose, RadioChoose } from './ChooseOption';
import { ChooseOption } from './ChooseOption';

interface ChooseGroupCommon<T extends string> {
    name: string;
    options: ChooseGroupOption<T>[];
}

type ChooseGroupProps<T extends string> = ChooseGroupCommon<T> &
    (CheckboxChoose<T> | RadioChoose<T>);

export function ChooseGroup<T extends string>(props: ChooseGroupProps<T>) {
    const allSelected = React.useMemo(
        () => new Set(props.type === 'checkbox' ? props.selected : [props.selected]),
        [props.selected],
    );

    return (
        <div>
            {props.options.map((o) =>
                props.type === 'radio' ? (
                    <ChooseOption
                        key={o.value}
                        name={props.name}
                        type={props.type}
                        option={o}
                        allSelected={allSelected}
                        onChange={props.onChange}
                        selected={props.selected}
                    />
                ) : (
                    <ChooseOption
                        key={o.value}
                        name={props.name}
                        type={props.type}
                        option={o}
                        allSelected={allSelected}
                        onChange={props.onChange}
                        selected={props.selected}
                    />
                ),
            )}
        </div>
    );
}
