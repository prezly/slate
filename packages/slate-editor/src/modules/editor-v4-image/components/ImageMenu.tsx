import type { ImageNode } from '@prezly/slate-types';
import { ImageLayout } from '@prezly/slate-types';
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

interface Props {
    element: ImageNode;
    onClose: () => void;
    onCrop: () => void;
    onEdit: () => void;
    onRemove: () => void;
    onUpdate: (props: Partial<Pick<ImageNode, 'layout' | 'href'>>) => void;
    showLayoutControls: boolean;
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

export function ImageMenu({
    element,
    onClose,
    onCrop,
    onEdit,
    onRemove,
    onUpdate,
    showLayoutControls,
}: Props) {
    const [href, setHref] = useState(element.href);

    const onHrefChange = useCallback(
        function (href: string, valid: boolean) {
            console.log({ href, valid });
            setHref(href);
            if (valid) {
                onUpdate({ href });
            }
        },
        [setHref],
    );

    useEffect(
        function () {
            setHref(element.href);
        },
        [element.href],
    );

    return (
        <>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Image settings
            </Toolbox.Header>

            <Toolbox.Section noPadding>
                <ButtonGroup>
                    {[
                        <Button key="edit" variant="clear" icon={Reload} fullWidth onClick={onEdit}>
                            Replace
                        </Button>,
                        <Button key="crop" variant="clear" icon={Crop} fullWidth onClick={onCrop}>
                            Crop
                        </Button>,
                    ]}
                </ButtonGroup>
            </Toolbox.Section>

            {showLayoutControls && (
                <Toolbox.Section caption="Image size">
                    <OptionsGroup
                        name="layout"
                        options={IMAGE_SIZE_OPTIONS}
                        selectedValue={element.layout}
                        onChange={(layout) => onUpdate({ layout })}
                    />
                </Toolbox.Section>
            )}

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

                    <Toggle name="new_tab">Open in new tab</Toggle>
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
