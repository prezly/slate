import type { NewsroomGallery, OEmbedInfo } from '@prezly/sdk';
import type { BookmarkNode } from '@prezly/slate-types';
import { useEditorRef, useSelected } from '@udecode/plate/react';
import type { ReactNode } from 'react';
import React from 'react';

import { PlaceholderGallery } from '#icons';
import { useFunction } from '#lib';

import { EventsEditor } from '#modules/events';

import { createGalleryBookmark } from '../../gallery-bookmark';
import {
    PlaceholderElement,
    type Props as PlaceholderElementProps,
} from '../components/PlaceholderElement';
import { type Props as BaseProps } from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder, useCustomRendered } from '../lib';
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
    const editor = useEditorRef();
    const isSelected = useSelected();
    const [isCustomRendered, setCustomRendered] = useCustomRendered(isSelected);

    const handleSelect = useFunction(
        (promise: Promise<{ oembed?: BookmarkNode['oembed']; url: BookmarkNode['url'] }>) => {
            setCustomRendered(false);

            PlaceholdersManager.register(element.type, element.uuid, promise);
            PlaceholdersManager.deactivateAll();
        },
    );

    const handleRemove = useFunction(() => {
        editor.tf.removeNodes({ at: [], match: (node) => node === element });
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
