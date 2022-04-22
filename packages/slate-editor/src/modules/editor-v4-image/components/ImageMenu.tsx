import type { ImageNode } from '@prezly/slate-types';
import { Alignment, ImageLayout } from '@prezly/slate-types';
import React, { useCallback, useEffect, useState } from 'react';

import type { OptionsGroupOption } from '#components';
import { Button, ButtonGroup, Input, OptionsGroup, Toggle, Toolbox, VStack } from '#components';
import {
    Crop,
    Delete,
    ImageLayoutContained,
    ImageLayoutExpanded,
    ImageLayoutFullWidth,
    Link,
    Reload,
} from '#icons';

import { STRING_URL_PATTERN } from '#modules/editor-v4-components/LinkMenu';

type FormState = Pick<ImageNode, 'align' | 'href' | 'layout' | 'new_tab'>;

interface Props {
    onChange: (props: Partial<FormState>) => void;
    onClose: () => void;
    onCrop: () => void;
    onRemove: () => void;
    onReplace: () => void;
    showLayoutControls: boolean;
    value: FormState;
    withNewTabOption: boolean;
}

const IMAGE_SIZE_OPTIONS: OptionsGroupOption<ImageLayout>[] = [
    {
        value: ImageLayout.CONTAINED,
        label: 'Contained',
        icon: (props) => <ImageLayoutContained fill={props.isActive ? '#F9CA7B' : 'white'} />,
    },
    {
        value: ImageLayout.EXPANDED,
        label: 'Expanded',
        icon: (props) => <ImageLayoutExpanded fill={props.isActive ? '#F9CA7B' : 'white'} />,
    },
    {
        value: ImageLayout.FULL_WIDTH,
        label: 'Full width',
        icon: (props) => <ImageLayoutFullWidth fill={props.isActive ? '#F9CA7B' : 'white'} />,
    },
];

const IMAGE_ALIGNMENT_OPTIONS: OptionsGroupOption<Alignment>[] = [
    {
        value: Alignment.LEFT,
        label: 'Left',
    },
    {
        value: Alignment.CENTER,
        label: 'Center',
    },
    {
        value: Alignment.RIGHT,
        label: 'Right',
    },
];

export function ImageMenu({
    onChange,
    onClose,
    onCrop,
    onRemove,
    onReplace,
    showLayoutControls,
    value,
    withNewTabOption,
}: Props) {
    const [href, setHref] = useState(value.href);

    const onHrefChange = useCallback(
        function (href: string, valid: boolean) {
            setHref(href);
            if (valid) {
                onChange({ href });
            }
        },
        [setHref],
    );

    useEffect(
        function () {
            setHref(value.href);
        },
        [value.href],
    );

    return (
        <>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Image settings
            </Toolbox.Header>

            <Toolbox.Section noPadding>
                <ButtonGroup>
                    {[
                        <ReplaceButton key="replace" onClick={onReplace} />,
                        <CropButton key="crop" onClick={onCrop} />,
                    ]}
                </ButtonGroup>
            </Toolbox.Section>

            {showLayoutControls && (
                <Toolbox.Section caption="Image size">
                    <OptionsGroup
                        name="layout"
                        options={IMAGE_SIZE_OPTIONS}
                        selectedValue={value.layout}
                        onChange={(layout) => onChange({ layout })}
                    />
                </Toolbox.Section>
            )}

            <Toolbox.Section caption="Image alignment" paddingBottom="3">
                <OptionsGroup
                    disabled={value.layout !== ImageLayout.CONTAINED}
                    name="align"
                    options={IMAGE_ALIGNMENT_OPTIONS}
                    selectedValue={value.align}
                    onChange={(align) => onChange({ align })}
                    variant="pills"
                />
            </Toolbox.Section>

            <Toolbox.Section>
                <VStack spacing="2-5">
                    <VStack spacing="1-5">
                        <Toolbox.Caption>Link</Toolbox.Caption>
                        <Input
                            name="href"
                            value={href}
                            onChange={onHrefChange}
                            icon={Link}
                            pattern={STRING_URL_PATTERN}
                            placeholder="Paste link"
                        />
                    </VStack>

                    {withNewTabOption && (
                        <Toggle
                            disabled={!href}
                            name="new_tab"
                            value={href ? Boolean(value.new_tab) : false}
                            onChange={(new_tab) => onChange({ new_tab })}
                        >
                            Open in new tab
                        </Toggle>
                    )}
                </VStack>
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button variant="clear-faded" icon={Delete} fullWidth onClick={onRemove}>
                    Remove image
                </Button>
            </Toolbox.Footer>
        </>
    );
}

function ReplaceButton(props: { onClick: () => void }) {
    return (
        <Button variant="clear" icon={Reload} fullWidth onClick={props.onClick}>
            Replace
        </Button>
    );
}

function CropButton(props: { onClick: () => void }) {
    return (
        <Button variant="clear" icon={Crop} fullWidth onClick={props.onClick}>
            Crop
        </Button>
    );
}
