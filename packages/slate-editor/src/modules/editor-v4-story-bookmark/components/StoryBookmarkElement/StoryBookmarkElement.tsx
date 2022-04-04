import type { StoryBookmarkNode } from '@prezly/slate-types';
import React, { useEffect } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { EditorBlock, LoadingPlaceholderV2 } from '#components';
import { ComponentStoryBookmark } from '#icons';
import { useAsyncFn } from '#lib';

import { removeStoryBookmark, updateImage } from '../../transforms';
import type { StoryBookmarkExtensionParameters } from '../../types';
import { StoryBookmarkMenu } from '../StoryBookmarkMenu';

import { StoryBookmarkBlock } from './StoryBookmarkBlock';

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

    useEffect(() => {
        loadStory();
    }, [loadStory]);

    if (error) {
        console.log(error);
    }

    return (
        <EditorBlock
            {...attributes} // contains `ref`
            element={element}
            overlay="always"
            renderMenu={({ onClose }) =>
                story && (
                    <StoryBookmarkMenu
                        onClose={onClose}
                        element={element}
                        story={story}
                        onUpdate={(attrs) => updateImage(editor, attrs)}
                        onRemove={() => removeStoryBookmark(editor)}
                    />
                )
            }
            renderBlock={({ isSelected }) => (
                <div>
                    {story && (
                        <StoryBookmarkBlock
                            isSelected={isSelected}
                            element={element}
                            story={story}
                        />
                    )}

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
