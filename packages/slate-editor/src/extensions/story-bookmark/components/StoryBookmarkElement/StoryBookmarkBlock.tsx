import type { Story } from '@prezly/sdk';
import type { StoryBookmarkNode } from '@prezly/slate-types';
import { StoryBookmarkLayout } from '@prezly/slate-types';
import React, { useRef, useState, useMemo } from 'react';

import { useResizeObserver, utils } from '#lib';

import { BookmarkCard } from '#modules/components';

interface StoryBookmarkBlockProps {
    story: Story;
    element: StoryBookmarkNode;
}

const HORIZONTAL_LAYOUT_MIN_WIDTH = 480;

export function StoryBookmarkBlock({ story, element }: StoryBookmarkBlockProps) {
    const card = useRef<HTMLDivElement | null>(null);
    const [isSmallViewport, setSmallViewport] = useState(false);

    const showThumbnail = element.show_thumbnail && story.oembed.thumbnail_url;

    const isEmpty =
        !showThumbnail &&
        utils.isEmptyText(story.oembed.title) &&
        utils.isEmptyText(story.oembed.description);

    const actualLayout = useMemo(() => {
        if (!showThumbnail) {
            return StoryBookmarkLayout.HORIZONTAL;
        } else if (isSmallViewport) {
            return StoryBookmarkLayout.VERTICAL;
        } else {
            return element.layout;
        }
    }, [showThumbnail, isSmallViewport, element.layout]);

    useResizeObserver(card.current, function (entries) {
        entries.forEach(function (entry) {
            setSmallViewport(entry.contentRect.width < HORIZONTAL_LAYOUT_MIN_WIDTH);
        });
    });

    const hasThumbnail = Boolean(showThumbnail && story.oembed.thumbnail_url);

    return (
        <BookmarkCard.Container border={false} layout={actualLayout} ref={card}>
            {showThumbnail && story.oembed.thumbnail_url && (
                <BookmarkCard.Thumbnail
                    href={story.oembed.url}
                    src={story.oembed.thumbnail_url}
                    width={story.oembed.thumbnail_width}
                    height={story.oembed.thumbnail_height}
                />
            )}
            <BookmarkCard.Details
                hasThumbnail={hasThumbnail}
                layout={actualLayout}
                href={story.oembed.url}
                title={story.oembed.title}
                description={story.oembed.description}
            >
                <BookmarkCard.Provider
                    showUrl={isEmpty}
                    url={story.oembed.url}
                    providerName={story.oembed.provider_name}
                    providerUrl={story.oembed.provider_url}
                />
            </BookmarkCard.Details>
        </BookmarkCard.Container>
    );
}
