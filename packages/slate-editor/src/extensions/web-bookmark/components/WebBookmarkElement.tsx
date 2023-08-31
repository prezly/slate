import type { BookmarkNode } from '@prezly/slate-types';
import { BookmarkCardLayout } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';
import { useRef, useState } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';
import { useResizeObserver } from '#lib';

import { BookmarkCard } from '#modules/components';

import { WebBookmarkMenu } from './WebBookmarkMenu';

const HORIZONTAL_LAYOUT_MIN_WIDTH = 480;

interface Props extends RenderElementProps {
    element: BookmarkNode;
    withNewTabOption: boolean;
}

export const WebBookmarkElement: FunctionComponent<Props> = ({
    attributes,
    children,
    element,
    withNewTabOption,
}) => {
    const card = useRef<HTMLDivElement | null>(null);
    const [isSmallViewport, setSmallViewport] = useState(false);

    const { url, oembed, layout } = element;
    const showThumbnail = element.show_thumbnail && oembed.thumbnail_url;

    const autoLayout = !showThumbnail
        ? BookmarkCardLayout.HORIZONTAL
        : isSmallViewport
        ? BookmarkCardLayout.VERTICAL
        : layout;

    useResizeObserver(card.current, function (entries) {
        entries.forEach(function (entry) {
            setSmallViewport(entry.contentRect.width < HORIZONTAL_LAYOUT_MIN_WIDTH);
        });
    });

    return (
        <EditorBlock
            {...attributes} // contains `ref`
            border
            element={element}
            overlay="always"
            renderMenu={({ onClose }) => (
                <WebBookmarkMenu
                    onClose={onClose}
                    element={element}
                    withNewTabOption={withNewTabOption}
                />
            )}
            // We have to render children or Slate will fail when trying to find the node.
            renderAboveFrame={children}
            renderReadOnlyFrame={() => (
                <BookmarkCard
                    border={false}
                    layout={autoLayout}
                    forwardRef={card}
                    oembed={oembed}
                    url={url}
                    withThumbnail={Boolean(element.show_thumbnail)}
                />
            )}
            rounded
            void
        />
    );
};
