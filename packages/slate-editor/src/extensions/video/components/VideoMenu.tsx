import { VideoNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React from 'react';

import type { OptionsGroupOption } from '#components';
import { Button, InfoText, OptionsGroup, Toolbox } from '#components';
import {
    Delete,
    ExternalLink,
    ImageLayoutContained,
    ImageLayoutExpanded,
    ImageLayoutFullWidth,
} from '#icons';

import type { Presentation } from '../types';

import styles from './VideoMenu.module.scss';

export interface FormState {
    layout: VideoNode['layout'];
}

interface Props {
    info?: InfoText.StructuredContent;
    url: VideoNode['url'];
    onChange: (props: Partial<FormState>) => void;
    onConvert: (presentation: Presentation) => void;
    onClose: () => void;
    onRemove: () => void;
    value: FormState;
    withLayoutControls: boolean;
    withConversionOptions: boolean;
}

const VIDEO_LAYOUT_OPTIONS: OptionsGroupOption<VideoNode.Layout>[] = [
    {
        value: VideoNode.Layout.CONTAINED,
        label: 'Contained',
        icon: ({ isActive }) => (
            <ImageLayoutContained
                className={classNames(styles.Icon, { [styles.active]: isActive })}
            />
        ),
    },
    {
        value: VideoNode.Layout.EXPANDED,
        label: 'Expanded',
        icon: ({ isActive }) => (
            <ImageLayoutExpanded
                className={classNames(styles.Icon, { [styles.active]: isActive })}
            />
        ),
    },
    {
        value: VideoNode.Layout.FULL_WIDTH,
        label: 'Full width',
        icon: ({ isActive }) => (
            <ImageLayoutFullWidth
                className={classNames(styles.Icon, { [styles.active]: isActive })}
            />
        ),
    },
];

const PRESENTATION_OPTIONS: OptionsGroupOption<Presentation>[] = [
    {
        value: 'embed',
        label: 'Embed',
    },
    {
        value: 'card',
        label: 'Bookmark',
    },
];

export function VideoMenu({
    info = [],
    url,
    onChange,
    onConvert,
    onClose,
    onRemove,
    value,
    withLayoutControls,
    withConversionOptions,
}: Props) {
    const isSelfHosted =
        url.startsWith('https://cdn.uc.assets.prezly.com/') ||
        url.startsWith('https://ucarecdn.com/');

    return (
        <>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Video settings
            </Toolbox.Header>

            {!isSelfHosted && (
                <Toolbox.Section noPadding>
                    <Button
                        type="link"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        icon={ExternalLink}
                        iconPosition="right"
                        fullWidth
                    >
                        Go to video
                    </Button>
                </Toolbox.Section>
            )}

            {info.length > 0 && (
                <Toolbox.Section>
                    <InfoText.Structured className={styles.Info}>{info}</InfoText.Structured>
                </Toolbox.Section>
            )}

            {withLayoutControls && (
                <Toolbox.Section caption="Size">
                    <OptionsGroup
                        name="layout"
                        options={VIDEO_LAYOUT_OPTIONS}
                        selectedValue={value.layout}
                        onChange={(layout) => {
                            onChange({ layout });
                        }}
                    />
                </Toolbox.Section>
            )}

            {withConversionOptions && (
                <Toolbox.Section caption="Change to...">
                    <OptionsGroup
                        name="presentation"
                        options={PRESENTATION_OPTIONS}
                        selectedValue="embed"
                        onChange={onConvert}
                        variant="pills"
                    />
                </Toolbox.Section>
            )}

            <Toolbox.Footer>
                <Button variant="clear-faded" icon={Delete} fullWidth onClick={onRemove}>
                    Remove video
                </Button>
            </Toolbox.Footer>
        </>
    );
}
