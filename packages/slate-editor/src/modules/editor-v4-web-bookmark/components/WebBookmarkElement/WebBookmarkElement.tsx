import type { BookmarkNode } from '@prezly/slate-types';
import { BookmarkCardLayout } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';

import './WebBookmarkElement.scss';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: BookmarkNode;
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
    return !Boolean(
        text && text.replace(/\s+/g, '')
    );
}

const Thumbnail: FunctionComponent<{ href: string, src: string, width?: number, height?: number }> = ({ href, src, width, height }) => (
    <a href={href} className="editor-v4-web-bookmark-element__thumbnail" style={{ backgroundImage: `url("${src}")` }}>
        <img
            className="editor-v4-web-bookmark-element__thumbnail-image"
            src={src}
            width={width}
            height={height}
            alt="Website preview"
        />
    </a>
);

const Provider: FunctionComponent<{ oembed: BookmarkNode['oembed'], showUrl: boolean }> = ({ oembed, showUrl }) => {
    const { url } = oembed;
    const favicon = `https://avatars-cdn.prezly.com/favicon/fetch?url=${url}?ideal_height=32`;
    const providerUrl = showUrl ? url : homepage(oembed.provider_url || url);
    const provider = showUrl ? url : (
        oembed.provider_name || hostname(oembed.provider_url || url)
    );

    return (
        <a className="editor-v4-web-bookmark-element__provider"
           rel="noopener noreferrer"
           target="_blank"
           href={providerUrl}
        >
            <img
                className="editor-v4-web-bookmark-element__provider-icon"
                src={favicon}
                alt={`${provider} favicon`}
                aria-hidden="true"
            />
            <span className="editor-v4-web-bookmark-element__provider-name">
                {provider}
            </span>
        </a>
    )
};

export const WebBookmarkElement: FunctionComponent<Props> = ({ attributes, children, element }) => {
    const isSelected = useSelected();
    const { url, oembed, layout } = element;
    const showThumbnail = element.show_thumbnail && oembed.thumbnail_url;
    const isEmpty = !showThumbnail
        && isEmptyText(oembed.title)
        && isEmptyText(oembed.description);
    const actualLayout = showThumbnail ? layout : BookmarkCardLayout.HORIZONTAL;

    return (
        <div
            {...attributes}
            className={classNames('editor-v4-web-bookmark-element', {
                'editor-v4-web-bookmark-element--active': isSelected,
                'editor-v4-web-bookmark-element--minimal': isEmpty,
                'editor-v4-web-bookmark-element--vertical': actualLayout === BookmarkCardLayout.VERTICAL,
                'editor-v4-web-bookmark-element--horizontal': actualLayout === BookmarkCardLayout.HORIZONTAL,
                'editor-v4-web-bookmark-element--video': element.oembed.type === 'video',
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
        >
            <div contentEditable={false}>
                <div
                    className={classNames('editor-v4-web-bookmark-element__overlay', {
                        'editor-v4-web-bookmark-element__overlay--hidden': isSelected,
                    })}
                />
                <div className="editor-v4-web-bookmark-element__card">
                    {showThumbnail && oembed.thumbnail_url && (
                        <Thumbnail
                            href={url}
                            src={oembed.thumbnail_url}
                            width={oembed.thumbnail_width}
                            height={oembed.thumbnail_height}
                        />
                    )}
                    <div className="editor-v4-web-bookmark-element__details">
                        {!isEmptyText(oembed.title) && (
                            <a
                                className="editor-v4-web-bookmark-element__title"
                                href={url}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {oembed.title}
                            </a>
                        )}
                        {!isEmptyText(oembed.description) && (
                            <div className="editor-v4-web-bookmark-element__description">
                              {oembed.description}
                            </div>
                        )}
                        <Provider oembed={oembed} showUrl={isEmpty} />
                    </div>
                </div>
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
};
