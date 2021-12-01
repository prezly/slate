import type { VideoNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent, ReactNode } from 'react';
import React, { useState } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';

import { PlayButton } from '../../../../icons';
import { HtmlInjection } from '../../../../components';

import './VideoElement.scss';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: VideoNode;
}

export const VideoElement: FunctionComponent<Props> = ({ attributes, children, element }) => {
    const isSelected = useSelected();
    const { href, oembed } = element;
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
                <div
                    className={classNames('editor-v4-video-element__overlay', {
                        'editor-v4-video-element__overlay--hidden': isSelected,
                    })}
                />
                <div className="editor-v4-video-element__card">
                    {!isHtmlEmbeddedWithErrors && oembed.type === 'video' && oembed.html ? (
                        <HtmlInjection html={oembed.html} onError={() => setHtmlEmbeddedWithErrors(true)} />
                    ) : (
                        <>
                            <Thumbnail
                                src={oembed.thumbnail_url}
                                width={oembed.thumbnail_width}
                                height={oembed.thumbnail_height}
                            />
                            <PlayButtonOverlay href={href} />
                        </>
                    )}
                </div>
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
};

const Thumbnail: FunctionComponent<{ src?: string, width?: number, height?: number }> = ({ src, width, height }) => {
    if (!src) {
        return <ThumbnailPlaceholder />;
    }

    const paddingBottom = width && height ? `${Math.round(100 * height / width)}%` : undefined;
    return (
        <div className="editor-v4-video-element__thumbnail" style={{ paddingBottom }}>
            <img
                className="editor-v4-video-element__thumbnail-image"
                src={src}
                alt="Video thumbnail"
            />
        </div>
    );
};

const ThumbnailPlaceholder: FunctionComponent = () => (
    <div className="editor-v4-video-element__thumbnail-placeholder" />
);

const ExternalLink: FunctionComponent<{ href: string, className?: string, children?: ReactNode }> = ({ href, children, className }) => (
    <a className={className} href={href} rel="noopener noreferer" target="blank">
        {children}
    </a>
);

const PlayButtonOverlay: FunctionComponent<{ href: string }> = ({ href }) => (
    <ExternalLink href={href} className="editor-v4-video-element__play-button-overlay">
        <PlayButton className="editor-v4-video-element__play-button-icon" />
    </ExternalLink>
);
