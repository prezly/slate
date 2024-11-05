import type { NewsroomGallery, OEmbedInfo } from '@prezly/sdk';
import type { BookmarkNode } from '@prezly/slate-types';
import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { Transforms } from 'slate';
import { useSelected, useSlateStatic } from 'slate-react';

import { PlaceholderGallery } from '#icons';
import { useFunction } from '#lib';

import { createGalleryBookmark } from '#extensions/gallery-bookmark';
import { EventsEditor } from '#modules/events';

import {
    PlaceholderElement,
    type Props as PlaceholderElementProps,
} from '../components/PlaceholderElement';
import { type Props as BaseProps } from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder } from '../lib';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

export function GalleryBookmarkPlaceholderElement({
    attributes,
    children,
    element,
    format = 'card',
    removable,
    renderPlaceholder,
}: GalleryBookmarkPlaceholderElement.Props) {
    const [isCustomRendered, setCustomRendered] = useState(false);
    const editor = useSlateStatic();
    const isSelected = useSelected();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSelect = useFunction(
        (promise: Promise<{ oembed?: BookmarkNode['oembed']; url: BookmarkNode['url'] }>) => {
            setCustomRendered(false);

            PlaceholdersManager.register(element.type, element.uuid, promise);
            PlaceholdersManager.deactivateAll();
        },
    );

    const handleRemove = useFunction(() => {
        Transforms.removeNodes(editor, { at: [], match: (node) => node === element });
    });

    const handleData = useFunction(
        (data: { url: BookmarkNode['url']; oembed?: BookmarkNode['oembed'] }) => {
            const { url, oembed } = data;
            if (!oembed) {
                EventsEditor.dispatchEvent(editor, 'notification', {
                    children: 'Selected gallery does not exist or is not supported.',
                    type: 'error',
                });
                return;
            }
            replacePlaceholder(editor, element, createGalleryBookmark({ url, oembed }), {
                select: isSelected,
            });
        },
    );

    usePlaceholderManagement(element.type, element.uuid, {
        onTrigger: handleTrigger,
        // @ts-expect-error Figure out how to fix this
        onResolve: handleData,
    });

    return (
        <PlaceholderElement
            attributes={attributes}
            element={element}
            format={format}
            icon={PlaceholderGallery}
            title="Click to insert a media gallery bookmark"
            description="Add a link to your media gallery"
            onClick={() => setCustomRendered(true)}
            overflow="visible"
            renderFrame={
                isCustomRendered
                    ? () => renderPlaceholder({ onRemove: handleRemove, onSelect: handleSelect })
                    : undefined
            }
            removable={removable}
        >
            {children}
        </PlaceholderElement>
    );
}

export namespace GalleryBookmarkPlaceholderElement {
    export interface Props
        extends Pick<BaseProps<NewsroomGallery>, 'attributes' | 'children' | 'element' | 'format'>,
            Pick<PlaceholderElementProps, 'removable'> {
        renderPlaceholder: (props: {
            onRemove: () => void;
            onSelect: (promise: Promise<{ oembed?: OEmbedInfo; url: string }>) => void;
        }) => ReactNode;
    }
}
