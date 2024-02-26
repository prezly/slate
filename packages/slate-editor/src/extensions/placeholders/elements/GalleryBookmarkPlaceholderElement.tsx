import type { NewsroomGallery } from '@prezly/sdk';
import type { BookmarkNode } from '@prezly/slate-types';
import React from 'react';
import { useSelected, useSlateStatic } from 'slate-react';

import { SearchInput } from '#components';
import { PlaceholderGallery } from '#icons';
import { useFunction } from '#lib';

import { EventsEditor } from '#modules/events';

import { createGalleryBookmark } from '../../gallery-bookmark';
import type { Props as PlaceholderElementProps } from '../components/PlaceholderElement';
import {
    type Props as BaseProps,
    SearchInputPlaceholderElement,
} from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';
import type { FetchOEmbedFn } from '../types';

export function GalleryBookmarkPlaceholderElement({
    children,
    element,
    fetchOembed,
    format = 'card',
    getSuggestions,
    removable,
    renderAddon,
    renderEmpty,
    renderSuggestion,
    renderSuggestionsFooter,
    ...props
}: GalleryBookmarkPlaceholderElement.Props) {
    const editor = useSlateStatic();
    const isSelected = useSelected();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSelect = useFunction(async (uuid: string, { url }: NewsroomGallery) => {
        EventsEditor.dispatchEvent(editor, 'gallery-bookmark-placeholder-submitted', {
            gallery: { uuid },
        });

        const loading = fetchOembed(url).then(
            (oembed) => ({ oembed, url }),
            () => ({ url }), // `oembed` is undefined if an error occurred
        );

        PlaceholdersManager.register(element.type, element.uuid, loading);
        PlaceholdersManager.deactivateAll();
    });

    const handleData = useFunction(
        (data: { url: BookmarkNode['url']; oembed?: BookmarkNode['oembed'] }) => {
            const { url, oembed } = data;
            if (!oembed) {
                EventsEditor.dispatchEvent(editor, 'notification', {
                    children: 'Provided URL does not exist or is not supported.',
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
        onResolve: handleData,
    });

    return (
        <SearchInputPlaceholderElement<NewsroomGallery>
            {...props}
            element={element}
            // Core
            format={format}
            icon={PlaceholderGallery}
            title="Click to insert a media gallery bookmark"
            description="Add a link to your media gallery"
            // Input
            getSuggestions={getSuggestions}
            renderAddon={renderAddon}
            renderEmpty={renderEmpty}
            renderSuggestion={renderSuggestion}
            renderSuggestions={(props) => (
                <SearchInput.Suggestions
                    activeElement={props.activeElement}
                    query={props.query}
                    suggestions={props.suggestions}
                    footer={renderSuggestionsFooter?.(props)}
                >
                    {props.children}
                </SearchInput.Suggestions>
            )}
            inputTitle="Media gallery bookmark"
            inputDescription="Add a media gallery card to your stories, campaigns and pitches"
            inputPlaceholder="Search media galleries"
            onSelect={handleSelect}
            removable={removable}
        >
            {children}
        </SearchInputPlaceholderElement>
    );
}

export namespace GalleryBookmarkPlaceholderElement {
    export interface Props
        extends Omit<
                BaseProps<NewsroomGallery>,
                | 'onSelect'
                | 'icon'
                | 'title'
                | 'description'
                | 'inputTitle'
                | 'inputDescription'
                | 'inputPlaceholder'
                | 'renderSuggestions'
            >,
            Pick<PlaceholderElementProps, 'removable'> {
        element: PlaceholderNode<PlaceholderNode.Type.GALLERY_BOOKMARK>;
        fetchOembed: FetchOEmbedFn;
        renderSuggestionsFooter?: BaseProps<NewsroomGallery>['renderSuggestions'];
    }
}
