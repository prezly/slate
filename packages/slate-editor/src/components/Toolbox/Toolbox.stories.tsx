import * as React from 'react';

import type { OptionsGroupOption } from '#components';
import { VStack } from '#components';
import { Toolbox, Toggle, OptionsGroup, Button, Input } from '#components';
import { ExternalLink, Delete, ItemsLayoutVertical, ItemsLayoutHorizontal, Link } from '#icons';

export default {
    title: 'Components/Toolbox',
};

export function Base() {
    const [cardLayout, setCardLayout] = React.useState<
        typeof cardLayoutOptions[number]['value'] | undefined
    >('vertical');

    const cardLayoutOptions: OptionsGroupOption<'vertical' | 'horizontal'>[] = [
        {
            value: 'vertical',
            label: 'Left',
            icon: (props) => <ItemsLayoutVertical fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'horizontal',
            label: 'Center',
            icon: (props) => <ItemsLayoutHorizontal fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
    ];

    return (
        <div style={{ width: 280 }}>
            <Toolbox.Panel>
                <Toolbox.Header withCloseButton>Web bookmark settings</Toolbox.Header>

                <Toolbox.Section noPadding>
                    <Button
                        type="link"
                        variant="clear"
                        href="#"
                        icon={ExternalLink}
                        iconPosition="right"
                        fullWidth
                    >
                        View
                    </Button>
                </Toolbox.Section>

                <Toolbox.Section caption="Preview image">
                    <Toggle name="show_preview">Show preview image</Toggle>
                </Toolbox.Section>

                <Toolbox.Section caption="Card layout">
                    <VStack spacing="2-5">
                        <OptionsGroup
                            name="layout"
                            options={cardLayoutOptions}
                            selectedValue={cardLayout}
                            onChange={setCardLayout}
                            columns={3}
                        />
                        <Toggle name="new_tab">Open in new tab</Toggle>
                    </VStack>
                </Toolbox.Section>

                <Toolbox.Footer>
                    <Button variant="clear-faded" icon={Delete} fullWidth>
                        Remove web bookmark
                    </Button>
                </Toolbox.Footer>
            </Toolbox.Panel>
        </div>
    );
}

export function LinkSettings() {
    const [text, setText] = React.useState('');
    const [link, setLink] = React.useState('');

    return (
        <div style={{ width: 280 }}>
            <Toolbox.Panel>
                <Toolbox.Header withCloseButton>Link settings</Toolbox.Header>

                <Toolbox.Section caption="Text">
                    <Input value={text} onChange={setText} placeholder="Link text" />
                </Toolbox.Section>

                <Toolbox.Section caption="Link">
                    <VStack spacing="2-5">
                        <Input
                            value={link}
                            onChange={setLink}
                            icon={Link}
                            placeholder="Paste link or search content"
                        />
                        <Toggle name="new_tab">Open in new tab</Toggle>
                        <Button variant="clear-faded" fullWidth>
                            Save
                        </Button>
                    </VStack>
                </Toolbox.Section>
            </Toolbox.Panel>
        </div>
    );
}
