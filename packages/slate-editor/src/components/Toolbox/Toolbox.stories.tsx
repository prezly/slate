import * as React from 'react';

import type { OptionsGroupOption } from '#components';
import { VStack } from '#components';
import { Toolbox, Toggle, OptionsGroup, Button } from '#components';
import { ExternalLink, Delete, ItemsLayoutVertical, ItemsLayoutHorizontal } from '#icons';

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
            Icon: (props) => <ItemsLayoutVertical fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'horizontal',
            label: 'Center',
            Icon: (props) => <ItemsLayoutHorizontal fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'horizontal3',
            label: 'Right',
            Icon: (props) => <ItemsLayoutHorizontal fill={props.isActive ? '#F9CA7B' : 'white'} />,
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
                        Icon={ExternalLink}
                        iconPosition="right"
                        fullWidth
                    >
                        View
                    </Button>
                </Toolbox.Section>

                <Toolbox.Section caption="Preview image">
                    <Toggle>Show preview image</Toggle>
                </Toolbox.Section>

                <Toolbox.Section caption="Card layout">
                    <VStack spacing="2-5">
                        <OptionsGroup
                            name="card-layout"
                            type="radio"
                            options={cardLayoutOptions}
                            selected={cardLayout}
                            onChange={setCardLayout}
                            columns={3}
                        />
                        <Toggle>Open in new tab</Toggle>
                    </VStack>
                </Toolbox.Section>

                <Toolbox.Footer>
                    <Button variant="clear" Icon={Delete} fullWidth>
                        Remove web bookmark
                    </Button>
                </Toolbox.Footer>
            </Toolbox.Panel>
        </div>
    );
}
