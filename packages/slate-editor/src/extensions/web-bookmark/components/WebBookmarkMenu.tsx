import { BookmarkNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import { useSelected, useSlate } from 'slate-react';

import type { OptionsGroupOption } from '#components';
import { Button, OptionsGroup, Toggle, Toolbox, VStack } from '#components';
import { Delete, ExternalLink, ItemsLayoutHorizontal, ItemsLayoutVertical } from '#icons';

import { EventsEditor } from '#modules/events';

import { removeWebBookmark, updateWebBookmark } from '../transforms';
import type { Presentation } from '../types';

import styles from './WebBookmarkMenu.module.scss';

interface Props {
    element: BookmarkNode;
    withNewTabOption: boolean;
    withConversionOptions: boolean;
    onClose: () => void;
    onConvert: (presentation: Presentation) => void;
}

const LAYOUT_OPTIONS: OptionsGroupOption<BookmarkNode.Layout>[] = [
    {
        label: 'Vertical',
        value: BookmarkNode.Layout.VERTICAL,
        icon: ({ isActive }) => (
            <ItemsLayoutVertical
                className={classNames(styles.OptionIcon, { [styles.active]: isActive })}
            />
        ),
    },
    {
        label: 'Horizontal',
        value: BookmarkNode.Layout.HORIZONTAL,
        icon: ({ isActive }) => (
            <ItemsLayoutHorizontal
                className={classNames(styles.OptionIcon, { [styles.active]: isActive })}
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

export const WebBookmarkMenu: FunctionComponent<Props> = ({
    element,
    withNewTabOption,
    withConversionOptions,
    onClose,
    onConvert,
}) => {
    const editor = useSlate();
    const isSelected = useSelected();

    function handleRemove() {
        const removedElement = removeWebBookmark(editor);

        if (removedElement) {
            EventsEditor.dispatchEvent(editor, 'web-bookmark-removed', {
                uuid: removedElement.uuid,
            });
        }
    }

    if (!isSelected) {
        return null;
    }

    const isLayoutChangeable = element.oembed.thumbnail_url && element.show_thumbnail;
    const activeLayout = isLayoutChangeable ? element.layout : BookmarkNode.Layout.VERTICAL;

    return (
        <>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Web bookmark settings
            </Toolbox.Header>

            <Toolbox.Section noPadding>
                <Button
                    type="link"
                    href={element.url}
                    target="_blank"
                    rel="noreferrer"
                    icon={ExternalLink}
                    iconPosition="right"
                    fullWidth
                >
                    View
                </Button>
            </Toolbox.Section>

            <Toolbox.Section caption="Preview image">
                <Toggle
                    disabled={!element.oembed.thumbnail_url}
                    name="show_thumbnail"
                    value={element.show_thumbnail}
                    onChange={(show_thumbnail) => updateWebBookmark(editor, { show_thumbnail })}
                >
                    Show preview image
                </Toggle>
            </Toolbox.Section>

            <Toolbox.Section caption="Card layout">
                <VStack spacing="2-5">
                    <OptionsGroup<`${BookmarkNode.Layout}`>
                        columns={3}
                        disabled={!isLayoutChangeable}
                        name="layout"
                        onChange={(layout) => updateWebBookmark(editor, { layout })}
                        options={LAYOUT_OPTIONS}
                        selectedValue={activeLayout}
                    />
                    {withNewTabOption && (
                        <Toggle
                            name="new_tab"
                            value={element.new_tab}
                            onChange={(new_tab) => updateWebBookmark(editor, { new_tab })}
                        >
                            Open in new tab
                        </Toggle>
                    )}
                </VStack>
            </Toolbox.Section>

            {withConversionOptions && (
                <Toolbox.Section caption="Change to...">
                    <OptionsGroup
                        name="presentation"
                        options={PRESENTATION_OPTIONS}
                        selectedValue="card"
                        onChange={onConvert}
                        variant="pills"
                    />
                </Toolbox.Section>
            )}

            <Toolbox.Footer>
                <Button variant="clear-faded" icon={Delete} fullWidth onMouseDown={handleRemove}>
                    Remove web bookmark
                </Button>
            </Toolbox.Footer>
        </>
    );
};
