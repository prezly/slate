import type { Story } from '@prezly/sdk';
import type { StoryBookmarkNode } from '@prezly/slate-types';
import { StoryBookmarkLayout } from '@prezly/slate-types';
import React, { useRef, useState, useMemo } from 'react';

import { useResizeObserver } from '#lib';

import { BookmarkCard } from '#modules/components';

interface StoryBookmarkBlockProps {
    story: Story;
    element: StoryBookmarkNode;
}

const HORIZONTAL_LAYOUT_MIN_WIDTH = 480;

export function StoryBookmarkBlock({ story, element }: StoryBookmarkBlockProps) {
    const card = useRef<HTMLDivElement | null>(null);
    const [isSmallViewport, setSmallViewport] = useState(false);

    const showThumbnail = Boolean(element.show_thumbnail && story.oembed.thumbnail_url);

    const autoLayout = useMemo(() => {
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

    return (
        <BookmarkCard
            border={false}
            layout={autoLayout}
            forwardRef={card}
            withThumbnail={showThumbnail}
            oembed={story.oembed}
        />
    );
}
