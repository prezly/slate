import type { VideoNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';

import './VideoElement.scss';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: VideoNode;
}

function isEmptyText(text: string | null | undefined): boolean {
    return !Boolean(
        text && text.replace(/\s+/g, '')
    );
}

const Thumbnail: FunctionComponent<{ src: string, width?: number, height?: number }> = ({ src, width, height }) => (
    <div className="editor-v4-video-element__thumbnail" style={{ backgroundImage: `url("${src}")` }}>
        <img
            className="editor-v4-video-element__thumbnail-image"
            src={src}
            width={width}
            height={height}
            alt="Website preview"
        />
    </div>
);

export const VideoElement: FunctionComponent<Props> = ({ attributes, children, element }) => {
    const isSelected = useSelected();
    const { href, oembed } = element;

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
                    {oembed.thumbnail_url && (
                        <Thumbnail
                            src={oembed.thumbnail_url}
                            width={oembed.thumbnail_width}
                            height={oembed.thumbnail_height}
                        />
                    )}
                </div>
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
};
