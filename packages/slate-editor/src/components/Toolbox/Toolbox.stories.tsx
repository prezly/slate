import * as React from 'react';

import type { OptionsGroupOption } from '#components';
import {
    Toolbox,
    Toggle,
    OptionsGroup,
    Button,
    Input,
    ButtonGroup,
    VStack,
    InfoText,
} from '#components';
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
    Edit,
    Dice,
    Link,
    Reload,
    Crop,
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
            label: 'Vertical',
            icon: (props) => <ItemsLayoutVertical fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'horizontal',
            label: 'Horizontal',
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
        <div style={{ width: 320 }}>
            <Toolbox.Panel>
                <Toolbox.Header withCloseButton>Link settings</Toolbox.Header>
                <Toolbox.Section>
                    <VStack spacing="2">
                        <VStack spacing="1-5">
                            <Toolbox.Caption>Text</Toolbox.Caption>
                            <Input value={text} onChange={setText} placeholder="Link text" />
                        </VStack>

                        <VStack spacing="2">
                            <VStack spacing="2-5">
                                <VStack spacing="1-5">
                                    <Toolbox.Caption>Link</Toolbox.Caption>
                                    <Input
                                        value={link}
                                        onChange={setLink}
                                        icon={Link}
                                        placeholder="Paste link or search content"
                                    />
                                </VStack>

                                <Toggle name="new_tab">Open in new tab</Toggle>
                            </VStack>

                            <Button variant="primary" fullWidth round>
                                Save
                            </Button>
                        </VStack>
                    </VStack>
                </Toolbox.Section>
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

    const [imageSize, setImageSize] = React.useState<
        typeof imageSizeOptions[number]['value'] | undefined
    >('m');

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

    const imageSizeOptions: OptionsGroupOption<'xs' | 's' | 'm' | 'l' | 'xl'>[] = [
        {
            value: 'xs',
            label: 'XS',
        },
        {
            value: 's',
            label: 'S',
        },
        {
            value: 'm',
            label: 'M',
        },
        {
            value: 'l',
            label: 'L',
        },
        {
            value: 'xl',
            label: 'XL',
        },
    ];

    return (
        <div style={{ width: 280 }}>
            <Toolbox.Panel>
                <Toolbox.Header withCloseButton>Gallery settings</Toolbox.Header>

                <Toolbox.Section noPadding>
                    <ButtonGroup>
                        {[
                            <Button key="edit" variant="clear" icon={Edit} fullWidth>
                                Edit
                            </Button>,
                            <Button key="view" variant="clear" icon={Dice} fullWidth>
                                Randomize
                            </Button>,
                        ]}
                    </ButtonGroup>
                </Toolbox.Section>

                <Toolbox.Section>
                    <InfoText>
                        You can reorder and crop your gallery images in the{' '}
                        <Button variant="underlined">preview</Button>
                    </InfoText>
                </Toolbox.Section>

                <Toolbox.Section caption="Gallery width">
                    <OptionsGroup
                        name="gallery-width"
                        options={galleryWidthOptions}
                        selectedValue={cardLayout}
                        onChange={setCardLayout}
                    />
                </Toolbox.Section>

                <Toolbox.Section caption="Image size">
                    <OptionsGroup
                        name="image-size"
                        options={imageSizeOptions}
                        selectedValue={imageSize}
                        onChange={setImageSize}
                        variant="pills"
                    />
                </Toolbox.Section>

                <Toolbox.Section caption="Spacing between images">
                    <OptionsGroup
                        name="spacing-between-images"
                        options={spacingBetweenImagesOptions}
                        selectedValue={spacingBetweenImages}
                        onChange={setSpacingBetweenImages}
                    />
                </Toolbox.Section>

                <Toolbox.Footer>
                    <Button variant="clear-faded" icon={Delete} fullWidth>
                        Remove gallery
                    </Button>
                </Toolbox.Footer>
            </Toolbox.Panel>
        </div>
    );
}

export function AttachmentSettings() {
    const [text, setText] = React.useState('');

    return (
        <div style={{ width: 320 }}>
            <Toolbox.Panel>
                <Toolbox.Header withCloseButton>Attachment settings</Toolbox.Header>
                <Toolbox.Section>
                    <VStack spacing="2">
                        <VStack spacing="1-5">
                            <Toolbox.Caption>Title</Toolbox.Caption>
                            <Input value={text} onChange={setText} placeholder="filename.png" />
                        </VStack>

                        <VStack spacing="2">
                            <Button variant="primary" fullWidth round>
                                Save
                            </Button>
                        </VStack>
                    </VStack>
                </Toolbox.Section>

                <Toolbox.Footer>
                    <Button variant="clear-faded" icon={Delete} fullWidth>
                        Remove attachment
                    </Button>
                </Toolbox.Footer>
            </Toolbox.Panel>
        </div>
    );
}

export function CoverageCard() {
    const [cardLayout, setCardLayout] = React.useState<
        typeof cardLayoutOptions[number]['value'] | undefined
    >('horizontal');

    const cardLayoutOptions: OptionsGroupOption<'vertical' | 'horizontal'>[] = [
        {
            value: 'horizontal',
            label: 'Horizontal',
            icon: (props) => <ItemsLayoutHorizontal fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
        {
            value: 'vertical',
            label: 'Vertical',
            icon: (props) => <ItemsLayoutVertical fill={props.isActive ? '#F9CA7B' : 'white'} />,
        },
    ];

    return (
        <div style={{ width: 280 }}>
            <Toolbox.Panel>
                <Toolbox.Header withCloseButton>Coverage card settings</Toolbox.Header>

                <Toolbox.Section noPadding>
                    <ButtonGroup>
                        {[
                            <Button
                                key="edit"
                                variant="clear"
                                icon={ExternalLink}
                                iconPosition="right"
                                fullWidth
                            >
                                Edit
                            </Button>,
                            <Button
                                key="view"
                                variant="clear"
                                icon={ExternalLink}
                                iconPosition="right"
                                fullWidth
                            >
                                View
                            </Button>,
                        ]}
                    </ButtonGroup>
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

export function ImageSettings() {
    const [link, setLink] = React.useState('');

    const [imageSize, setImageSize] = React.useState<
        typeof imageSizeOptions[number]['value'] | undefined
    >('contained');

    const [spacingBetweenImages, setSpacingBetweenImages] = React.useState<
        typeof spacingBetweenImagesOptions[number]['value'] | undefined
    >('left');

    const imageSizeOptions: OptionsGroupOption<'contained' | 'expanded' | 'full-width'>[] = [
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

    const spacingBetweenImagesOptions: OptionsGroupOption<'left' | 'center' | 'right'>[] = [
        {
            value: 'left',
            label: 'Left',
        },
        {
            value: 'center',
            label: 'Center',
        },
        {
            value: 'right',
            label: 'Right',
        },
    ];

    return (
        <div style={{ width: 280 }}>
            <Toolbox.Panel>
                <Toolbox.Header withCloseButton>Image settings</Toolbox.Header>

                <Toolbox.Section noPadding>
                    <ButtonGroup>
                        {[
                            <Button key="edit" variant="clear" icon={Reload} fullWidth>
                                Replace
                            </Button>,
                            <Button key="view" variant="clear" icon={Crop} fullWidth>
                                Crop
                            </Button>,
                        ]}
                    </ButtonGroup>
                </Toolbox.Section>

                <Toolbox.Section caption="Image size">
                    <OptionsGroup
                        name="image-size"
                        options={imageSizeOptions}
                        selectedValue={imageSize}
                        onChange={setImageSize}
                    />
                </Toolbox.Section>

                <Toolbox.Section caption="Image alignment" paddingBottom="3">
                    <OptionsGroup
                        name="image-alignment"
                        options={spacingBetweenImagesOptions}
                        selectedValue={spacingBetweenImages}
                        onChange={setSpacingBetweenImages}
                        variant="pills"
                    />
                </Toolbox.Section>

                <Toolbox.Section>
                    <VStack spacing="2-5">
                        <VStack spacing="1-5">
                            <Toolbox.Caption>Link</Toolbox.Caption>
                            <Input
                                value={link}
                                onChange={setLink}
                                icon={Link}
                                placeholder="Paste link or search content"
                            />
                        </VStack>

                        <Toggle name="new_tab">Open in new tab</Toggle>
                    </VStack>
                </Toolbox.Section>

                <Toolbox.Footer>
                    <Button variant="clear-faded" icon={Delete} fullWidth>
                        Remove image
                    </Button>
                </Toolbox.Footer>
            </Toolbox.Panel>
        </div>
    );
}
