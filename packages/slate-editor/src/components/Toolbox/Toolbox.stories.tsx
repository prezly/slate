import * as React from 'react';

import type { OptionsGroupOption } from '#components';
import { VStack } from '#components';
import { Toolbox, Toggle, OptionsGroup, Button, Link } from '#components';
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
            label: 'Vertical',
            Icon: (props) => <ItemsLayoutVertical fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'horizontal',
            label: 'Horizontal',
            Icon: (props) => <ItemsLayoutHorizontal fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
    ];

    return (
        <div style={{ width: 280 }}>
            <Toolbox.Panel>
                <Toolbox.Header withCloseButton>Web bookmark settings</Toolbox.Header>

                <Toolbox.Section noPadding>
                    <Link href="#" Icon={ExternalLink} fullWidth>
                        View
                    </Link>
                </Toolbox.Section>

                <Toolbox.Section caption="Preview image">
                    <Toggle name="show_preview">Show preview image</Toggle>
                </Toolbox.Section>

                <Toolbox.Section caption="Card layout">
                    <VStack spacing="spacing-1-5">
                        <OptionsGroup
                            name="layout"
                            type="radio"
                            options={cardLayoutOptions}
                            selected={cardLayout}
                            onChange={setCardLayout}
                            columns={3}
                        />
                        <Toggle name="new_tab">Open in new tab</Toggle>
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
