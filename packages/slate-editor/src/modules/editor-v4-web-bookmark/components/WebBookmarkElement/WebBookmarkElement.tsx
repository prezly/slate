import type { BookmarkNode } from '@prezly/slate-types';
import { BookmarkCardLayout } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';
import { useRef, useState } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';
import { useResizeObserver, utils } from '#lib';

import { BookmarkCard } from '#modules/editor-v4-components';

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
    const isEmpty =
        !showThumbnail && utils.isEmptyText(oembed.title) && utils.isEmptyText(oembed.description);

    const actualLayout = !showThumbnail
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
            element={element}
            overlay="always"
            renderMenu={({ onClose }) => (
                <WebBookmarkMenu
                    onClose={onClose}
                    element={element}
                    withNewTabOption={withNewTabOption}
                />
            )}
            renderBlock={({ isSelected }) => (
                <BookmarkCard.Container isSelected={isSelected} layout={actualLayout} ref={card}>
                    {showThumbnail && oembed.thumbnail_url && (
                        <BookmarkCard.Thumbnail
                            href={url}
                            src={oembed.thumbnail_url}
                            width={oembed.thumbnail_width}
                            height={oembed.thumbnail_height}
                        />
                    )}
                    <BookmarkCard.Details
                        href={url}
                        title={oembed.title}
                        description={oembed.description}
                    >
                        <BookmarkCard.Provider
                            showUrl={isEmpty}
                            url={oembed.url}
                            providerName={oembed.provider_name}
                            providerUrl={oembed.provider_url}
                        />
                    </BookmarkCard.Details>
                </BookmarkCard.Container>
            )}
            void
        >
            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </EditorBlock>
    );
};
