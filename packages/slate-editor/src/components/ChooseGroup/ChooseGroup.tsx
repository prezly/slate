import * as React from 'react';
import styled from 'styled-components';

import type { ChooseGroupOption, CheckboxChoose, RadioChoose } from './ChooseOption';
import { ChooseOption } from './ChooseOption';

interface ChooseGroupCommon<T extends string> {
    name: string;
    options: ChooseGroupOption<T>[];
    columns?: number;
}

type ChooseGroupProps<T extends string> = ChooseGroupCommon<T> &
    (CheckboxChoose<T> | RadioChoose<T>);

export function ChooseGroup<T extends string>(props: ChooseGroupProps<T>) {
    const allSelected = React.useMemo(
        () => new Set(props.type === 'checkbox' ? props.selected : [props.selected]),
        [props.selected],
    );

    const totalColumns = props.columns ?? props.options.length;

    return (
        <ChooseGroupWrapper totalColumns={totalColumns}>
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
        </ChooseGroupWrapper>
    );
}

const ChooseGroupWrapper = styled.div<{ totalColumns: number }>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.totalColumns}, 1fr);
    justify-items: center;
    grid-column-gap: 8px;
`;
