import type { StoryBookmarkNode } from '@prezly/slate-types';
import React, { useEffect } from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock, LoadingPlaceholderV2 } from '#components';
import { ComponentStoryBookmark } from '#icons';
import { useAsyncFn } from '#lib';

import type { StoryBookmarkExtensionParameters } from '../../types';

interface Props extends RenderElementProps {
    element: StoryBookmarkNode;
    params: StoryBookmarkExtensionParameters;
}

const ESTIMATED_LOADING_DURATION = 300;

export function StoryBookmarkElement({ attributes, children, element, params }: Props) {
    const [{ error, loading, value: story }, loadStory] = useAsyncFn(() => {
        return params.loadStory(element.story.uuid);
    }, [params.loadStory, element.story.uuid]);

    useEffect(() => {
        loadStory();
    }, [loadStory]);

    return (
        <EditorBlock
            {...attributes} // contains `ref`
            element={element}
            overlay="always"
            renderMenu={undefined}
            renderBlock={({ isSelected }) => (
                <div>
                    <div>StoryBookmark</div>
                    <pre>{JSON.stringify(element, undefined, 4)}</pre>
                    {story && (
                        <pre>
                            {JSON.stringify(
                                {
                                    uuid: story.uuid,
                                    title: story.title,
                                    thumbnail_url: story.thumbnail_url,
                                    newsroom: {
                                        display_name: story.newsroom.display_name,
                                        thumbnail_url: story.newsroom.thumbnail_url,
                                        newsroom: story.newsroom.url,
                                    },
                                    links: {
                                        newsroom_preview: story.links.newsroom_preview,
                                    },
                                },
                                undefined,
                                4,
                            )}
                        </pre>
                    )}
                    <pre>{JSON.stringify(error, undefined, 4)}</pre>
                    {isSelected && 'Selected'}

                    {loading && (
                        <LoadingPlaceholderV2.Placeholder
                            className="editor-v4-coverage-element__loading-placeholder"
                            estimatedDuration={ESTIMATED_LOADING_DURATION}
                        >
                            {({ percent }) => (
                                <>
                                    <LoadingPlaceholderV2.Icon icon={ComponentStoryBookmark} />
                                    <LoadingPlaceholderV2.Description percent={percent}>
                                        Loading Story bookmark
                                    </LoadingPlaceholderV2.Description>
                                    <LoadingPlaceholderV2.ProgressBar percent={percent} />
                                </>
                            )}
                        </LoadingPlaceholderV2.Placeholder>
                    )}
                </div>
            )}
            void
        >
            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </EditorBlock>
    );
}
