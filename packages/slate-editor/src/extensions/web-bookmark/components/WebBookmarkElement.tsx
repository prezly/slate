import { BookmarkNode } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';
import { useCallback, useRef, useState } from 'react';
import React from 'react';
import { useSlateStatic, type RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';
import { useResizeObserver } from '#lib';

import { BookmarkCard } from '#modules/components';
import { EventsEditor } from '#modules/events';

import { convertWebBookmark } from '../transforms';
import type { Presentation } from '../types';

import { WebBookmarkMenu } from './WebBookmarkMenu';

const HORIZONTAL_LAYOUT_MIN_WIDTH = 480;

interface Props extends RenderElementProps {
    element: BookmarkNode;
    withNewTabOption: boolean;
    withConversionOptions: boolean;
}

export const WebBookmarkElement: FunctionComponent<Props> = ({
    attributes,
    children,
    element,
    withNewTabOption,
    withConversionOptions,
}) => {
    const editor = useSlateStatic();

    const card = useRef<HTMLDivElement | null>(null);
    const [isSmallViewport, setSmallViewport] = useState(false);

    const { url, oembed, layout } = element;
    const showThumbnail = element.show_thumbnail && oembed.thumbnail_url;

    const autoLayout = !showThumbnail
        ? BookmarkNode.Layout.HORIZONTAL
        : isSmallViewport
        ? BookmarkNode.Layout.VERTICAL
        : layout;

    const handleConvert = useCallback(
        (presentation: Presentation) => {
            convertWebBookmark(editor, element, presentation);
            EventsEditor.dispatchEvent(editor, 'web-bookmark-converted', {
                to: presentation,
                element,
            });
        },
        [editor, element],
    );

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
                    onConvert={handleConvert}
                    element={element}
                    withNewTabOption={withNewTabOption}
                    withConversionOptions={withConversionOptions}
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
