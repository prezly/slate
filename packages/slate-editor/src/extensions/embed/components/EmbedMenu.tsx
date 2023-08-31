import { BOOKMARK_NODE_TYPE } from '@prezly/slate-types';
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

import { EmbedNode } from '../EmbedNode';
import type { Presentation } from '../types';

import styles from './EmbedMenu.module.scss';

export interface FormState {
    layout: EmbedNode['layout'];
}

interface Props {
    info?: InfoText.StructuredContent;
    url: EmbedNode['url'];
    onChange: (props: Partial<FormState>) => void;
    onConvert: (presentation: Presentation) => void;
    onClose: () => void;
    onRemove: () => void;
    value: FormState;
    withLayoutControls: boolean;
}

const LAYOUT_OPTIONS: OptionsGroupOption<EmbedNode.Layout>[] = [
    {
        value: EmbedNode.Layout.CONTAINED,
        label: 'Contained',
        icon: ({ isActive }) => (
            <ImageLayoutContained
                className={classNames(styles.Icon, { [styles.active]: isActive })}
            />
        ),
    },
    {
        value: EmbedNode.Layout.EXPANDED,
        label: 'Expanded',
        icon: ({ isActive }) => (
            <ImageLayoutExpanded
                className={classNames(styles.Icon, { [styles.active]: isActive })}
            />
        ),
    },
    {
        value: EmbedNode.Layout.FULL_WIDTH,
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
        value: EmbedNode.TYPE,
        label: 'Embed',
    },
    {
        value: BOOKMARK_NODE_TYPE,
        label: 'Bookmark',
    },
];

export function EmbedMenu({
    info = [],
    url,
    onChange,
    onClose,
    onConvert,
    onRemove,
    value,
    withLayoutControls,
}: Props) {
    return (
        <>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Embed settings
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

            {info.length > 0 && (
                <Toolbox.Section>
                    <InfoText.Structured className={styles.Info}>{info}</InfoText.Structured>
                </Toolbox.Section>
            )}

            {withLayoutControls && (
                <Toolbox.Section caption="Size">
                    <OptionsGroup
                        name="layout"
                        options={LAYOUT_OPTIONS}
                        selectedValue={value.layout}
                        onChange={(layout) => {
                            onChange({ layout });
                        }}
                    />
                </Toolbox.Section>
            )}

            <Toolbox.Section caption="Change to...">
                <OptionsGroup
                    name="presentation"
                    options={PRESENTATION_OPTIONS}
                    selectedValue={EmbedNode.TYPE}
                    onChange={onConvert}
                    variant="pills"
                />
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button variant="clear-faded" icon={Delete} fullWidth onClick={onRemove}>
                    Remove embed
                </Button>
            </Toolbox.Footer>
        </>
    );
}
