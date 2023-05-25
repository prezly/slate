import type { ContactNode } from '@prezly/slate-types';
import { ContactLayout } from '@prezly/slate-types';
import React from 'react';

import type { OptionsGroupOption } from '#components';
import { Button, OptionsGroup, Toggle, Toolbox } from '#components';
import { ContactLayoutCard, ContactLayoutSignature, Delete } from '#icons';

interface Props {
    element: ContactNode;
    onChangeLayout: (layout: ContactLayout) => void;
    onClose: () => void;
    onRemove: () => void;
    onToggleAvatar: (visible: boolean) => void;
}

const LAYOUT_OPTIONS: OptionsGroupOption<ContactLayout>[] = [
    {
        value: ContactLayout.CARD,
        label: 'Card',
        icon: (props) => <ContactLayoutCard fill={props.isActive ? '#F9CA7B' : 'white'} />,
    },
    {
        value: ContactLayout.SIGNATURE,
        label: 'Signature',
        icon: (props) => <ContactLayoutSignature fill={props.isActive ? '#F9CA7B' : 'white'} />,
    },
];

export function PressContactMenu({
    element,
    onChangeLayout,
    onClose,
    onRemove,
    onToggleAvatar,
}: Props) {
    return (
        <>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Site contact settings
            </Toolbox.Header>

            <Toolbox.Section>
                <Toggle
                    disabled={!element.contact.avatar_url}
                    onChange={onToggleAvatar}
                    name="show_avatar"
                    value={element.show_avatar}
                >
                    Show avatar
                </Toggle>
            </Toolbox.Section>

            <Toolbox.Section caption="Card layout">
                <OptionsGroup<ContactLayout>
                    name="layout"
                    columns={3} // intentionally using 3 columns so the options are better laid out
                    options={LAYOUT_OPTIONS}
                    selectedValue={element.layout}
                    onChange={onChangeLayout}
                />
            </Toolbox.Section>

            <Toolbox.Footer>
                <RemoveButton onClick={onRemove} />
            </Toolbox.Footer>
        </>
    );
}

function RemoveButton(props: { onClick: () => void }) {
    return (
        <Button variant="clear-faded" icon={Delete} fullWidth onClick={props.onClick}>
            Remove
        </Button>
    );
}
