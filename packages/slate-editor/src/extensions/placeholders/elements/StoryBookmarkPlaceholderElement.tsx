import type { StoryRef } from '@prezly/sdk';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { Transforms } from 'slate';
import { useSelected, useSlateStatic } from 'slate-react';

import { PlaceholderStory } from '#icons';
import { useFunction } from '#lib';

import { createStoryBookmark } from '../../story-bookmark';
import {
    PlaceholderElement,
    type Props as PlaceholderElementProps,
} from '../components/PlaceholderElement';
import { type Props as BaseProps } from '../components/SearchInputPlaceholderElement';
import { replacePlaceholder } from '../lib';
import type { PlaceholderNode } from '../PlaceholderNode';

export function StoryBookmarkPlaceholderElement({
    attributes,
    children,
    element,
    format = 'card',
    removable,
    renderPlaceholder,
}: StoryBookmarkPlaceholderElement.Props) {
    const [isCustomRendered, setCustomRendered] = useState(true);
    const editor = useSlateStatic();
    const isSelected = useSelected();

    const handleSelect = useFunction((uuid: StoryRef['uuid']) => {
        replacePlaceholder(editor, element, createStoryBookmark({ story: { uuid } }), {
            select: isSelected,
        });
    });

    const handleRemove = useFunction(() => {
        Transforms.removeNodes(editor, { at: [], match: (node) => node === element });
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
            icon={PlaceholderStory}
            title="Click to insert a story bookmark"
            description="Add one of your Prezly stories"
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

export namespace StoryBookmarkPlaceholderElement {
    export interface Props
        extends Pick<BaseProps<StoryRef>, 'attributes' | 'children' | 'format'>,
            Pick<PlaceholderElementProps, 'removable'> {
        element: PlaceholderNode<PlaceholderNode.Type.STORY_BOOKMARK>;
        renderPlaceholder: (props: {
            onRemove: () => void;
            onSelect: (uuid: string) => void;
        }) => ReactNode;
    }
}
