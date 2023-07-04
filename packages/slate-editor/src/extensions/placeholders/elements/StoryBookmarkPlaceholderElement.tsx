import type { StoryRef } from '@prezly/sdk';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { SearchInput } from '#components';
import { PlaceholderStory } from '#icons';
import { useFunction } from '#lib';

import { EventsEditor } from '#modules/events';

import { createStoryBookmark } from '../../story-bookmark';
import type { Props as PlaceholderElementProps } from '../components/PlaceholderElement';
import {
    type Props as BaseProps,
    SearchInputPlaceholderElement,
} from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

export function StoryBookmarkPlaceholderElement({
    children,
    element,
    format = 'card',
    getSuggestions,
    removable,
    renderAddon,
    renderEmpty,
    renderSuggestion,
    renderSuggestionsFooter,
    ...props
}: StoryBookmarkPlaceholderElement.Props) {
    const editor = useSlateStatic();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSelect = useFunction((uuid: StoryRef['uuid']) => {
        EventsEditor.dispatchEvent(editor, 'story-bookmark-dialog-submitted', {
            story: { uuid },
        });

        replacePlaceholder(editor, element, createStoryBookmark({ story: { uuid } }));
    });

    usePlaceholderManagement(element.type, element.uuid, {
        onTrigger: handleTrigger,
    });

    return (
        <SearchInputPlaceholderElement<StoryRef>
            {...props}
            element={element}
            // Core
            format={format}
            icon={PlaceholderStory}
            title="Click to insert a story bookmark"
            description="Add one of your Prezly stories"
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
            inputTitle="Story bookmark"
            inputDescription="Add a story card to your stories, campaigns and pitches"
            inputPlaceholder="Search Prezly stories"
            onSelect={handleSelect}
            removable={removable}
        >
            {children}
        </SearchInputPlaceholderElement>
    );
}

export namespace StoryBookmarkPlaceholderElement {
    export interface Props
        extends Omit<
                BaseProps<StoryRef>,
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
        element: PlaceholderNode<PlaceholderNode.Type.STORY_BOOKMARK>;
        renderSuggestionsFooter?: BaseProps<StoryRef>['renderSuggestions'];
    }
}
