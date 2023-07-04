import type { StoryBookmarkNode } from '@prezly/slate-types';
import React, { useEffect } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { EditorBlock, ElementPlaceholder, LoadingPlaceholder } from '#components';
import { ChickenNoSignalIllustration, ComponentStoryBookmark } from '#icons';
import { useAsyncFn } from '#lib';

import { EventsEditor } from '#modules/events';

import { removeStoryBookmark, updateStoryBookmark } from '../../transforms';
import type { StoryBookmarkExtensionParameters } from '../../types';
import { StoryBookmarkMenu } from '../StoryBookmarkMenu';

import { StoryBookmarkBlock } from './StoryBookmarkBlock';
import styles from './StoryBookmarkElement.module.scss';

interface Props extends RenderElementProps {
    element: StoryBookmarkNode;
    params: StoryBookmarkExtensionParameters;
}

const ESTIMATED_LOADING_DURATION = 300;

export function StoryBookmarkElement({ attributes, children, element, params }: Props) {
    const editor = useSlateStatic();

    const [{ error, loading, value: story }, loadStory] = useAsyncFn(() => {
        return params.loadStory(element.story.uuid);
    }, [params.loadStory, element.story.uuid]);

    function remove() {
        const removed = removeStoryBookmark(editor);

        if (removed) {
            EventsEditor.dispatchEvent(editor, 'story-bookmark-removed', {
                uuid: removed.uuid,
            });
        }
    }

    useEffect(() => {
        loadStory();
    }, [loadStory]);

    useEffect(() => {
        if (error) {
            EventsEditor.dispatchEvent(editor, 'notification', {
                children: error.message,
                type: 'error',
            });
        }
    }, [error]);

    const hasStory = !loading && story;

    return (
        <EditorBlock
            {...attributes} // contains `ref`
            border
            element={element}
            overlay={hasStory ? 'always' : false}
            renderMenu={
                hasStory
                    ? ({ onClose }) => (
                          <StoryBookmarkMenu
                              onClose={onClose}
                              element={element}
                              generateEditUrl={params.generateEditUrl}
                              generatePreviewUrl={params.generatePreviewUrl}
                              story={story}
                              withNewTabOption={params.withNewTabOption}
                              onUpdate={(attrs) => updateStoryBookmark(editor, attrs)}
                              onRemove={remove}
                          />
                      )
                    : undefined
            }
            // We have to render children or Slate will fail when trying to find the node.
            renderAboveFrame={children}
            renderReadOnlyFrame={() => {
                if (loading) {
                    return (
                        <LoadingPlaceholder
                            className={styles.LoadingPlaceholder}
                            icon={ComponentStoryBookmark}
                            description="Loading Story bookmark"
                            estimatedDuration={ESTIMATED_LOADING_DURATION}
                        />
                    );
                }

                if (story) {
                    return <StoryBookmarkBlock element={element} story={story} />;
                }

                return (
                    <ElementPlaceholder
                        illustration={<ChickenNoSignalIllustration />}
                        title="The selected Prezly Story is no longer available"
                        onDismiss={remove}
                        onDismissLabel="Remove this Story Bookmark"
                    />
                );
            }}
            void
        />
    );
}
