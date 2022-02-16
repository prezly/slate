import * as React from 'react';

import type { OptionsGroupOption } from '#components';
import { OptionsGroup } from '#components';
import { ItemsLayoutVertical, ItemsLayoutHorizontal } from '#icons';

export default {
    title: 'Components/OptionsGroup',
};

export function Base() {
    const [cardLayout, setCardLayout] = React.useState<
        typeof cardLayoutOptions[number]['value'] | undefined
    >('left');

    const cardLayoutOptions: OptionsGroupOption<'left' | 'center' | 'right'>[] = [
        {
            value: 'left',
            label: 'Left',
            icon: (props) => <ItemsLayoutVertical fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'center',
            label: 'Center',
            icon: (props) => <ItemsLayoutHorizontal fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'right',
            label: 'Right',
            icon: (props) => <ItemsLayoutHorizontal fill={props.isActive ? '#F9CA7B' : 'white'} />,
            disabled: true,
        },
    ];

    return (
        <div style={{ background: 'rgba(27, 27, 54, 0.96)', padding: 20 }}>
            <OptionsGroup
                name="card-layout"
                options={cardLayoutOptions}
                selectedValue={cardLayout}
                onChange={setCardLayout}
                columns={3}
            />
        </div>
    );
}

export function Disabled() {
    const [cardLayout, setCardLayout] = React.useState<
        typeof cardLayoutOptions[number]['value'] | undefined
    >('right');

    const cardLayoutOptions: OptionsGroupOption<'left' | 'center' | 'right' | 'righter'>[] = [
        {
            value: 'left',
            label: 'Left',
            icon: (props) => <ItemsLayoutVertical fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'center',
            label: 'Center',
            icon: (props) => <ItemsLayoutHorizontal fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'right',
            label: 'Right',
            icon: (props) => <ItemsLayoutHorizontal fill={props.isActive ? '#F9CA7B' : 'white'} />,
            disabled: false,
        },
        {
            value: 'righter',
            label: 'Righter',
            icon: (props) => <ItemsLayoutHorizontal fill={props.isActive ? '#F9CA7B' : 'white'} />,
            disabled: false,
        },
    ];

    return (
        <div style={{ background: 'rgba(27, 27, 54, 0.96)', padding: 20 }}>
            <OptionsGroup
                name="card-layout"
                options={cardLayoutOptions}
                selectedValue={cardLayout}
                onChange={setCardLayout}
                disabled
            />
        </div>
    );
}
