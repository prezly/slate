import type { BookmarkNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';

import './WebBookmarkElement.scss';
import { BookmarkCardLayout } from '@prezly/slate-types';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: BookmarkNode;
}

function hostname(url: string): string {
    const { host } = new URL(url);
    return host;
}

function isEmptyText(text: string | null | undefined): boolean {
    return Boolean(
        text && text.replace(/\s+/g, '')
    );
}

const Thumbnail: FunctionComponent<{ src: string, width?: number, height?: number }> = ({ src, width, height }) => (
    <div className="editor-v4-web-bookmark-element__thumbnail-container">
        <div className="editor-v4-web-bookmark-element__thumbnail">
            <img
                className="editor-v4-web-bookmark-element__thumbnail-image"
                src={src}
                width={width}
                height={height}
                alt="Website preview"
            />
        </div>
    </div>
);

const Provider: FunctionComponent<{ name: string | null | undefined, url: string | null | undefined }> = ({ name, url }) => {
    const favicon = `https://avatars-cdn.prezly.com/favicon/fetch?url=${url}`;
    const provider = name || (url && hostname(url)) || '';

    return (
        <div className="editor-v4-web-bookmark-element__provider">
            <img
                className="editor-v4-web-bookmark-element__provider-icon"
                src={favicon}
                alt={`${provider} favicon`}
                aria-hidden="true"
            />
            <div className="editor-v4-web-bookmark-element__provider-name">
                {provider}
            </div>
        </div>
    )
};

export const WebBookmarkElement: FunctionComponent<Props> = ({ attributes, children, element }) => {
    const isSelected = useSelected();
    const { href, oembed, layout, new_tab } = element;
    const showThumbnail = element.show_thumbnail;
    const target = new_tab ? 'target' : undefined;

    return (
        <div
            {...attributes}
            className={classNames('editor-v4-web-bookmark-element', {
                'editor-v4-web-bookmark-element--active': isSelected,
                'editor-v4-web-bookmark-element--vertical': layout === BookmarkCardLayout.VERTICAL,
                'editor-v4-web-bookmark-element--horizontal': layout === BookmarkCardLayout.HORIZONTAL,
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
                            src={oembed.thumbnail_url}
                            width={oembed.thumbnail_width}
                            height={oembed.thumbnail_height}
                        />
                    )}
                    <div className="editor-v4-web-bookmark-element__content">
                        <a
                            className="editor-v4-web-bookmark-element__title"
                            href={href}
                            rel="noopener noreferrer"
                            target={target}
                        >
                            {oembed.title}
                        </a>
                        {!isEmptyText(oembed.description) && (
                            <div className="editor-v4-web-bookmark-element__description">
                              {oembed.description}
                              {' '}
                              <a
                                  className="editor-v4-web-bookmark-element__read-more"
                                  href={href}
                                  rel="noopener noreferrer"
                                  target={target}
                              >
                                  Read more
                              </a>
                            </div>
                        )}
                        <Provider
                            name={oembed.provider_name}
                            url={oembed.provider_url || oembed.url || href}
                        />
                    </div>
                </div>
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
};
