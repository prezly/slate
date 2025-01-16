import type { ImageNode } from '@prezly/slate-types';
import { Alignment, ImageLayout } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import type { OptionsGroupOption } from '#components';
import { Button, ButtonGroup, Input, OptionsGroup, Toggle, Toolbox, VStack } from '#components';
import {
    Crop,
    Delete,
    ImageLayoutContained,
    ImageLayoutExpanded,
    ImageLayoutFullWidth,
    ImageSizeBestFit,
    ImageSizeOriginal,
    ImageSizeSmall,
    Link,
    Reload,
} from '#icons';
import { HREF_REGEXP, normalizeHref } from '#lib';

import styles from './ImageMenu.module.scss';

export enum Size {
    SMALL = 'small',
    BEST_FIT = 'best-fit',
    ORIGINAL = 'original',
}

export interface FormState {
    align: ImageNode['align'];
    href: ImageNode['href'];
    layout: ImageNode['layout'];
    new_tab: ImageNode['new_tab'];
    size: Size | undefined;
}

interface Props {
    onChange: (props: Partial<FormState>) => void;
    onCrop: () => void;
    onRemove: () => void;
    onReplace: () => void;
    value: FormState;
    withAlignmentOptions: boolean;
    withSizeOptions: boolean | Size[];
    withLayoutOptions: boolean;
    withNewTabOption: boolean;
}

const IMAGE_LAYOUT_OPTIONS: OptionsGroupOption<ImageLayout>[] = [
    {
        value: ImageLayout.CONTAINED,
        label: 'Contained',
        icon: ({ isActive }) => (
            <ImageLayoutContained
                className={classNames(styles.icon, { [styles.active]: isActive })}
            />
        ),
    },
    {
        value: ImageLayout.EXPANDED,
        label: 'Expanded',
        icon: ({ isActive }) => (
            <ImageLayoutExpanded
                className={classNames(styles.icon, { [styles.active]: isActive })}
            />
        ),
    },
    {
        value: ImageLayout.FULL_WIDTH,
        label: 'Full width',
        icon: ({ isActive }) => (
            <ImageLayoutFullWidth
                className={classNames(styles.icon, { [styles.active]: isActive })}
            />
        ),
    },
];

const IMAGE_SIZE_OPTIONS: OptionsGroupOption<Size>[] = [
    {
        value: Size.SMALL,
        label: 'Small',
        icon: ({ isActive }) => (
            <ImageSizeSmall className={classNames(styles.icon, { [styles.active]: isActive })} />
        ),
    },
    {
        value: Size.BEST_FIT,
        label: 'Best Fit',
        icon: ({ isActive }) => (
            <ImageSizeBestFit className={classNames(styles.icon, { [styles.active]: isActive })} />
        ),
    },
    {
        value: Size.ORIGINAL,
        label: 'Original',
        icon: ({ isActive }) => (
            <ImageSizeOriginal className={classNames(styles.icon, { [styles.active]: isActive })} />
        ),
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
    onCrop,
    onRemove,
    onReplace,
    value,
    withAlignmentOptions,
    withSizeOptions,
    withLayoutOptions,
    withNewTabOption,
}: Props) {
    const [href, setHref] = useState(value.href);

    const onHrefChange = useCallback(
        function (href: string, valid: boolean) {
            setHref(href);
            if (valid) {
                onChange({ href: normalizeHref(href) });
            }
        },
        [onChange],
    );

    useEffect(
        function () {
            if (normalizeHref(value.href) !== normalizeHref(href)) {
                setHref(value.href);
            }
        },
        [value.href],
    );

    return (
        <>
            <Toolbox.Header>Image settings</Toolbox.Header>

            <Toolbox.Section noPadding>
                <ButtonGroup>
                    {[
                        <ReplaceButton key="replace" onClick={onReplace} />,
                        <CropButton key="crop" onClick={onCrop} />,
                    ]}
                </ButtonGroup>
            </Toolbox.Section>

            {withLayoutOptions && (
                <Toolbox.Section caption="Size">
                    <OptionsGroup
                        name="layout"
                        options={IMAGE_LAYOUT_OPTIONS}
                        selectedValue={value.layout}
                        onChange={function (layout) {
                            const align =
                                layout === ImageLayout.CONTAINED ? value.align : Alignment.CENTER;
                            onChange({ layout, align });
                        }}
                    />
                </Toolbox.Section>
            )}

            {withSizeOptions && (
                <Toolbox.Section caption="Size">
                    <OptionsGroup
                        name="width"
                        options={getAvailableSizeOptions(withSizeOptions)}
                        selectedValue={value.size}
                        onChange={function (size) {
                            onChange({ size });
                        }}
                    />
                </Toolbox.Section>
            )}

            {withAlignmentOptions && (
                <Toolbox.Section caption="Alignment" paddingBottom="3">
                    <OptionsGroup
                        disabled={value.layout !== ImageLayout.CONTAINED}
                        name="align"
                        options={IMAGE_ALIGNMENT_OPTIONS}
                        selectedValue={value.align}
                        onChange={(align) => onChange({ align })}
                        variant="pills"
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
                            pattern={HREF_REGEXP.source}
                            placeholder="Paste link"
                            title="Please input a valid URL"
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
                <Button variant="clear" icon={Delete} fullWidth onClick={onRemove}>
                    Remove
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

function getAvailableSizeOptions(withSizeOptions: boolean | Size[]): OptionsGroupOption<Size>[] {
    if (withSizeOptions === false) return [];
    if (withSizeOptions === true) return IMAGE_SIZE_OPTIONS;

    return IMAGE_SIZE_OPTIONS.map((option) => ({
        ...option,
        disabled: !withSizeOptions.includes(option.value),
    }));
}
