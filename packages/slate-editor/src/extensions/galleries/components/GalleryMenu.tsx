import type { GalleryNode } from '@prezly/slate-types';
import { GalleryImageSize, GalleryLayout, GalleryPadding } from '@prezly/slate-types';
import React from 'react';
import type { Editor } from 'slate';
import { useSlate } from 'slate-react';

import type { OptionsGroupOption } from '#components';
import { Button, ButtonGroup, InfoText, OptionsGroup, Toolbox } from '#components';
import {
    Delete,
    Dice,
    Edit,
    ImageLayoutContained,
    ImageLayoutExpanded,
    ImageLayoutFullWidth,
    ImageSpacingNarrow,
    ImageSpacingRegular,
    ImageSpacingWide,
} from '#icons';

import { shuffleImages } from '../lib';
import { removeGallery, updateGallery } from '../transforms';

const LAYOUT_OPTIONS: OptionsGroupOption<GalleryLayout>[] = [
    {
        value: GalleryLayout.CONTAINED,
        label: 'Contained',
        icon: (props) => <ImageLayoutContained fill={props.isActive ? '#F9CA7B' : 'white'} />,
    },
    {
        value: GalleryLayout.EXPANDED,
        label: 'Expanded',
        icon: (props) => <ImageLayoutExpanded fill={props.isActive ? '#F9CA7B' : 'white'} />,
    },
    {
        value: GalleryLayout.FULL_WIDTH,
        label: 'Full width',
        icon: (props) => <ImageLayoutFullWidth fill={props.isActive ? '#F9CA7B' : 'white'} />,
    },
];

const PADDING_OPTIONS: OptionsGroupOption<GalleryPadding>[] = [
    {
        value: GalleryPadding.S,
        label: 'Narrow',
        icon: (props) => <ImageSpacingNarrow fill={props.isActive ? '#F9CA7B' : 'white'} />,
    },
    {
        value: GalleryPadding.M,
        label: 'Regular',
        icon: (props) => <ImageSpacingRegular fill={props.isActive ? '#F9CA7B' : 'white'} />,
    },
    {
        value: GalleryPadding.L,
        label: 'Wide',
        icon: (props) => <ImageSpacingWide fill={props.isActive ? '#F9CA7B' : 'white'} />,
    },
];

const SIZE_OPTIONS: OptionsGroupOption<GalleryImageSize>[] = [
    {
        value: GalleryImageSize.XS,
        label: 'XS',
    },
    {
        value: GalleryImageSize.S,
        label: 'S',
    },
    {
        value: GalleryImageSize.M,
        label: 'M',
    },
    {
        value: GalleryImageSize.L,
        label: 'L',
    },
    {
        value: GalleryImageSize.XL,
        label: 'XL',
    },
];

interface Props {
    element: GalleryNode;
    onEdit: (editor: Editor) => void;
    onClose: () => void;
    withWidthOption: boolean;
}

export function GalleryMenu({ element, onEdit, onClose, withWidthOption }: Props) {
    const editor = useSlate();

    function handleShuffle() {
        updateGallery(editor, {
            images: shuffleImages(element.images),
        });
    }

    return (
        <>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Gallery settings
            </Toolbox.Header>

            <Toolbox.Section noPadding>
                <ButtonGroup>
                    {[
                        <EditButton key="edit" onClick={() => onEdit(editor)} />,
                        <RandomizeButton key="randomize" onClick={handleShuffle} />,
                    ]}
                </ButtonGroup>
            </Toolbox.Section>

            <Toolbox.Section>
                <InfoText>
                    You can add, reorder, crop and set descriptions for your images by clicking{' '}
                    <Button variant="underlined" onClick={() => onEdit(editor)}>
                        Edit
                    </Button>
                </InfoText>
            </Toolbox.Section>

            {withWidthOption && (
                <Toolbox.Section caption="Gallery width">
                    <OptionsGroup<GalleryLayout>
                        name="layout"
                        options={LAYOUT_OPTIONS}
                        selectedValue={element.layout}
                        onChange={(layout) => updateGallery(editor, { layout })}
                    />
                </Toolbox.Section>
            )}

            <Toolbox.Section caption="Image size">
                <OptionsGroup<GalleryImageSize>
                    name="thumbnail_size"
                    options={SIZE_OPTIONS}
                    selectedValue={element.thumbnail_size}
                    onChange={(thumbnail_size) => updateGallery(editor, { thumbnail_size })}
                    variant="pills"
                />
            </Toolbox.Section>

            <Toolbox.Section caption="Spacing between images">
                <OptionsGroup<GalleryPadding>
                    name="padding"
                    options={PADDING_OPTIONS}
                    selectedValue={element.padding}
                    onChange={(padding) => updateGallery(editor, { padding })}
                />
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button
                    variant="clear-faded"
                    icon={Delete}
                    fullWidth
                    onClick={() => removeGallery(editor)}
                >
                    Remove gallery
                </Button>
            </Toolbox.Footer>
        </>
    );
}

function EditButton(props: { onClick: () => void }) {
    return (
        <Button variant="clear" icon={Edit} fullWidth onClick={props.onClick}>
            Edit
        </Button>
    );
}

function RandomizeButton(props: { onClick: () => void }) {
    return (
        <Button variant="clear" icon={Dice} fullWidth onClick={props.onClick}>
            Randomize
        </Button>
    );
}
