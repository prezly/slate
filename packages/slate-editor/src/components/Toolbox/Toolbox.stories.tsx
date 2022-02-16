import * as React from 'react';

import type { OptionsGroupOption } from '#components';
import { VStack } from '#components';
import { Toolbox, Toggle, OptionsGroup, Button } from '#components';
import {
    ExternalLink,
    Delete,
    ItemsLayoutVertical,
    ItemsLayoutHorizontal,
    ImageLayoutContained,
    ImageLayoutExpanded,
    ImageLayoutFullWidth,
    ImageSpacingNarrow,
    ImageSpacingRegular,
    ImageSpacingWide,
} from '#icons';

export default {
    title: 'Components/Toolbox',
};

export function WebBookmark() {
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
                            options={cardLayoutOptions}
                            selectedValue={cardLayout}
                            onChange={setCardLayout}
                            columns={3}
                        />
                        <Toggle>Open in new tab</Toggle>
                    </VStack>
                </Toolbox.Section>

                <Toolbox.Footer>
                    <Button variant="clear" Icon={Delete} fullWidth transparent="0-5">
                        Remove web bookmark
                    </Button>
                </Toolbox.Footer>
            </Toolbox.Panel>
        </div>
    );
}

export function GallerySettings() {
    const [cardLayout, setCardLayout] = React.useState<
        typeof galleryWidthOptions[number]['value'] | undefined
    >('contained');

    const [spacingBetweenImages, setSpacingBetweenImages] = React.useState<
        typeof spacingBetweenImagesOptions[number]['value'] | undefined
    >('regular');

    const galleryWidthOptions: OptionsGroupOption<'contained' | 'expanded' | 'full-width'>[] = [
        {
            value: 'contained',
            label: 'Contained',
            icon: (props) => <ImageLayoutContained fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'expanded',
            label: 'Expanded',
            icon: (props) => <ImageLayoutExpanded fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'full-width',
            label: 'Full width',
            icon: (props) => <ImageLayoutFullWidth fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
    ];

    const spacingBetweenImagesOptions: OptionsGroupOption<'narrow' | 'regular' | 'wide'>[] = [
        {
            value: 'narrow',
            label: 'Narrow',
            icon: (props) => <ImageSpacingNarrow fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'regular',
            label: 'Regular',
            icon: (props) => <ImageSpacingRegular fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'wide',
            label: 'Wide',
            icon: (props) => <ImageSpacingWide fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
    ];

    return (
        <div style={{ width: 280 }}>
            <Toolbox.Panel>
                <Toolbox.Header withCloseButton>Gallery settings</Toolbox.Header>

                <Toolbox.Section caption="Gallery width">
                    <OptionsGroup
                        name="gallery-width"
                        options={galleryWidthOptions}
                        selectedValue={cardLayout}
                        onChange={setCardLayout}
                    />
                </Toolbox.Section>

                <Toolbox.Section caption="Card layout">
                    <OptionsGroup
                        name="spacing-between-images"
                        options={spacingBetweenImagesOptions}
                        selectedValue={spacingBetweenImages}
                        onChange={setSpacingBetweenImages}
                    />
                </Toolbox.Section>

                <Toolbox.Footer>
                    <Button variant="clear" Icon={Delete} fullWidth transparent="0-5">
                        Remove gallery
                    </Button>
                </Toolbox.Footer>
            </Toolbox.Panel>
        </div>
    );
}
