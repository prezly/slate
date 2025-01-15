import type { StoryRef } from '@prezly/sdk';
import { useEditorRef, useSelected } from '@udecode/plate/react';
import type { ReactNode } from 'react';
import React from 'react';

import { PlaceholderStory } from '#icons';
import { useFunction } from '#lib';

import { createStoryEmbed } from '#extensions/story-embed';
import { EventsEditor } from '#modules/events';

import {
    PlaceholderElement,
    type Props as PlaceholderElementProps,
} from '../components/PlaceholderElement';
import { type Props as BaseProps } from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder, useCustomRendered } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';

export function StoryEmbedPlaceholderElement({
    attributes,
    children,
    element,
    format = 'card',
    removable,
    renderPlaceholder,
}: StoryEmbedPlaceholderElement.Props) {
    const editor = useEditorRef();
    const isSelected = useSelected();
    const [isCustomRendered, setCustomRendered] = useCustomRendered(isSelected);

    const handleSelect = useFunction((uuid: StoryRef['uuid']) => {
        EventsEditor.dispatchEvent(editor, 'story-embed-placeholder-submitted', {
            story: { uuid },
        });

        replacePlaceholder(editor, element, createStoryEmbed({ story: { uuid } }), {
            select: isSelected,
        });
    });

    const handleRemove = useFunction(() => {
        editor.tf.removeNodes({ at: [], match: (node) => node === element });
    });

    return (
        <PlaceholderElement
            attributes={attributes}
            element={element}
            format={format}
            icon={PlaceholderStory}
            title="Click to insert a story"
            description="Add one of your Prezly stories"
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

export namespace StoryEmbedPlaceholderElement {
    export interface Props
        extends Pick<BaseProps<StoryRef>, 'attributes' | 'children' | 'format'>,
            Pick<PlaceholderElementProps, 'removable'> {
        element: PlaceholderNode<PlaceholderNode.Type.STORY_EMBED>;
        renderPlaceholder: (props: {
            onRemove: (() => void) | undefined;
            onSelect: (uuid: string) => void;
        }) => ReactNode;
    }
}
