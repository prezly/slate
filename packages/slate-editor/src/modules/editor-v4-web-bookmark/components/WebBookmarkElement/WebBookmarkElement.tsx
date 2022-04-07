import type { BookmarkNode } from '@prezly/slate-types';
import { BookmarkCardLayout } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import { useRef, useState } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';
import { useResizeObserver } from '#lib';

import styles from './WebBookmarkElement.module.scss';
import { WebBookmarkMenu } from './WebBookmarkMenu';

const HORIZONTAL_LAYOUT_MIN_WIDTH = 480;

interface Props extends RenderElementProps {
    element: BookmarkNode;
    withNewTabOption: boolean;
}

function hostname(url: string): string {
    const { host } = new URL(url);
    return host;
}

function homepage(url: string): string {
    const { origin } = new URL(url);
    return origin;
}

function isEmptyText(text: string | null | undefined): boolean {
    return !(text && text.replace(/\s+/g, ''));
}

const Thumbnail: FunctionComponent<{ href: string; src: string; width?: number; height?: number }> =
    ({ href, src, width, height }) => (
        <a href={href} className={styles.thumbnail} style={{ backgroundImage: `url("${src}")` }}>
            <img
                className={styles.thumbnailImage}
                src={src}
                width={width}
                height={height}
                alt="Website preview"
            />
        </a>
    );

const Provider: FunctionComponent<{ oembed: BookmarkNode['oembed']; showUrl: boolean }> = ({
    oembed,
    showUrl,
}) => {
    const { url } = oembed;
    const favicon = `https://avatars-cdn.prezly.com/favicon?url=${url}?ideal_height=32`;
    const providerUrl = showUrl ? url : homepage(oembed.provider_url || url);
    const provider = showUrl ? url : oembed.provider_name || hostname(oembed.provider_url || url);

    return (
        <a className={styles.provider} rel="noopener noreferrer" target="_blank" href={providerUrl}>
            <img
                className={styles.providerIcon}
                src={favicon}
                alt={`${provider} favicon`}
                aria-hidden="true"
            />
            <span className={styles.providerName}>{provider}</span>
        </a>
    );
};

export const WebBookmarkElement: FunctionComponent<Props> = ({ attributes, children, element, withNewTabOption }) => {
    const card = useRef<HTMLDivElement | null>(null);
    const [isSmallViewport, setSmallViewport] = useState(false);

    const { url, oembed, layout } = element;
    const showThumbnail = element.show_thumbnail && oembed.thumbnail_url;
    const isEmpty = !showThumbnail && isEmptyText(oembed.title) && isEmptyText(oembed.description);

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
            renderMenu={({ onClose }) => <WebBookmarkMenu onClose={onClose} element={element} withNewTabOption={withNewTabOption} />}
            renderBlock={({ isSelected }) => (
                <div
                    className={classNames(styles.card, {
                        [styles.selected]: isSelected,
                        [styles.vertical]: actualLayout === BookmarkCardLayout.VERTICAL,
                        [styles.horizontal]: actualLayout === BookmarkCardLayout.HORIZONTAL,
                    })}
                    ref={card}
                >
                    {showThumbnail && oembed.thumbnail_url && (
                        <Thumbnail
                            href={url}
                            src={oembed.thumbnail_url}
                            width={oembed.thumbnail_width}
                            height={oembed.thumbnail_height}
                        />
                    )}
                    <div className={styles.details}>
                        {!isEmptyText(oembed.title) && (
                            <a
                                className={styles.title}
                                href={url}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {oembed.title}
                            </a>
                        )}
                        {!isEmptyText(oembed.description) && (
                            <div className={styles.description}>{oembed.description}</div>
                        )}
                        <Provider oembed={oembed} showUrl={isEmpty} />
                    </div>
                </div>
            )}
            void
        >
            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </EditorBlock>
    );
};
