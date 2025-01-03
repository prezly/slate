import type { NewsroomGallery, OEmbedInfo } from '@prezly/sdk';
import type { BookmarkNode } from '@prezly/slate-types';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { Transforms } from 'slate';
import { useSelected, useSlateStatic } from 'slate-react';

import { PlaceholderGallery } from '#icons';
import { useFunction } from '#lib';

import { EventsEditor } from '#modules/events';

import { createGalleryBookmark } from '../../gallery-bookmark';
import {
    PlaceholderElement,
    type Props as PlaceholderElementProps,
} from '../components/PlaceholderElement';
import { type Props as BaseProps } from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

export function GalleryBookmarkPlaceholderElement({
    attributes,
    children,
    element,
    format = 'card',
    removable,
    renderPlaceholder,
}: GalleryBookmarkPlaceholderElement.Props) {
    const [isCustomRendered, setCustomRendered] = useState(true);
    const editor = useSlateStatic();
    const isSelected = useSelected();

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
        onResolve: handleData,
    });

    useEffect(() => {
        if (!isSelected) {
            setCustomRendered(false);
        }
    }, [isSelected]);

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
                    ? () =>
                          renderPlaceholder({
                              onRemove: removable ? handleRemove : undefined,
                              onSelect: handleSelect,
                          })
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
        extends Pick<BaseProps<NewsroomGallery>, 'attributes' | 'children' | 'format'>,
            Pick<PlaceholderElementProps, 'removable'> {
        element: PlaceholderNode<PlaceholderNode.Type.GALLERY_BOOKMARK>;
        renderPlaceholder: (props: {
            onRemove: (() => void) | undefined;
            onSelect: (promise: Promise<{ oembed?: OEmbedInfo; url: string }>) => void;
        }) => ReactNode;
    }
}
