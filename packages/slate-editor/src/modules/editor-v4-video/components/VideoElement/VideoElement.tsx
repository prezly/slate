import type { VideoNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { useState } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';

import { HtmlInjection } from '#components';
import { PlayButton } from '#icons';

import './VideoElement.scss';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: VideoNode;
}

export function VideoElement({ attributes, children, element }: Props) {
    const isSelected = useSelected();
    const { url, oembed } = element;
    const [isHtmlEmbeddedWithErrors, setHtmlEmbeddedWithErrors] = useState<boolean>(false);

    return (
        <div
            {...attributes}
            className={classNames('editor-v4-video-element', {
                'editor-v4-video-element--active': isSelected,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
        >
            <div contentEditable={false}>
                <div className="editor-v4-video-element__card">
                    {!isHtmlEmbeddedWithErrors && oembed.type === 'video' && oembed.html ? (
                        <HtmlInjection
                            html={oembed.html}
                            onError={() => setHtmlEmbeddedWithErrors(true)}
                        />
                    ) : (
                        <>
                            <Thumbnail
                                src={oembed.thumbnail_url}
                                width={oembed.thumbnail_width}
                                height={oembed.thumbnail_height}
                            />
                            <PlayButtonOverlay href={url} />
                        </>
                    )}
                </div>
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
}

function Thumbnail(props: { src?: string; width?: number; height?: number }) {
    const { src, width, height } = props;
    if (!src) {
        return <ThumbnailPlaceholder />;
    }

    const paddingBottom = width && height ? `${Math.round((100 * height) / width)}%` : undefined;
    return (
        <div className="editor-v4-video-element__thumbnail" style={{ paddingBottom }}>
            <img
                className="editor-v4-video-element__thumbnail-image"
                src={src}
                alt="Video thumbnail"
            />
        </div>
    );
}

function ThumbnailPlaceholder() {
    return <div className="editor-v4-video-element__thumbnail-placeholder" />;
}

function ExternalLink(props: { href: string; className?: string; children?: ReactNode }) {
    return (
        <a className={props.className} href={props.href} rel="noopener noreferer" target="blank">
            {props.children}
        </a>
    );
}

function PlayButtonOverlay(props: { href: string }) {
    return (
        <ExternalLink href={props.href} className="editor-v4-video-element__play-button-overlay">
            <PlayButton className="editor-v4-video-element__play-button-icon" />
        </ExternalLink>
    );
}
