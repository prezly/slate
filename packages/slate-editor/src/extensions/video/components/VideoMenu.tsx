import { VideoNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React from 'react';

import type { OptionsGroupOption } from '#components';
import { Button, OptionsGroup, Toolbox } from '#components';
import {
    Delete,
    ExternalLink,
    ImageLayoutContained,
    ImageLayoutExpanded,
    ImageLayoutFullWidth,
} from '#icons';

import styles from './VideoMenu.module.scss';

export interface FormState {
    layout: VideoNode['layout'];
}

interface Props {
    url: VideoNode['url'];
    onChange: (props: Partial<FormState>) => void;
    onClose: () => void;
    onRemove: () => void;
    value: FormState;
}

const VIDEO_LAYOUT_OPTIONS: OptionsGroupOption<VideoNode.Layout>[] = [
    {
        value: VideoNode.Layout.CONTAINED,
        label: 'Contained',
        icon: ({ isActive }) => (
            <ImageLayoutContained
                className={classNames(styles.icon, { [styles.active]: isActive })}
            />
        ),
    },
    {
        value: VideoNode.Layout.EXPANDED,
        label: 'Expanded',
        icon: ({ isActive }) => (
            <ImageLayoutExpanded
                className={classNames(styles.icon, { [styles.active]: isActive })}
            />
        ),
    },
    {
        value: VideoNode.Layout.FULL_WIDTH,
        label: 'Full width',
        icon: ({ isActive }) => (
            <ImageLayoutFullWidth
                className={classNames(styles.icon, { [styles.active]: isActive })}
            />
        ),
    },
];

export function VideoMenu({ url, onChange, onClose, onRemove, value }: Props) {
    return (
        <>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Video settings
            </Toolbox.Header>

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
                    View
                </Button>
            </Toolbox.Section>

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

            <Toolbox.Footer>
                <Button variant="clear-faded" icon={Delete} fullWidth onClick={onRemove}>
                    Remove video
                </Button>
            </Toolbox.Footer>
        </>
    );
}
