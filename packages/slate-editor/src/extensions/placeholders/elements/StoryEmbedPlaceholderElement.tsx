import type { StoryRef } from '@prezly/sdk';
import React from 'react';
import { useSelected, useSlateStatic } from 'slate-react';

import { SearchInput } from '#components';
import { PlaceholderStory } from '#icons';
import { useFunction } from '#lib';

import { createStoryEmbed } from '#extensions/story-embed';
import { EventsEditor } from '#modules/events';

import type { Props as PlaceholderElementProps } from '../components/PlaceholderElement';
import {
    type Props as BaseProps,
    SearchInputPlaceholderElement,
} from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';

export function StoryEmbedPlaceholderElement({
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
}: StoryEmbedPlaceholderElement.Props) {
    const editor = useSlateStatic();
    const isSelected = useSelected();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSelect = useFunction((uuid: StoryRef['uuid']) => {
        EventsEditor.dispatchEvent(editor, 'story-embed-placeholder-submitted', {
            story: { uuid },
        });

        replacePlaceholder(editor, element, createStoryEmbed({ story: { uuid } }), {
            select: isSelected,
        });
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
            title="Click to insert a story"
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
            inputTitle="Story embed"
            inputDescription="Add a story to your stories, campaigns and pitches"
            inputPlaceholder="Search Prezly stories"
            onSelect={handleSelect}
            removable={removable}
        >
            {children}
        </SearchInputPlaceholderElement>
    );
}

export namespace StoryEmbedPlaceholderElement {
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
        element: PlaceholderNode<PlaceholderNode.Type.STORY_EMBED>;
        renderSuggestionsFooter?: BaseProps<StoryRef>['renderSuggestions'];
    }
}
