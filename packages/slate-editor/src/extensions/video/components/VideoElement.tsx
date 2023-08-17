import type { VideoNode } from '@prezly/slate-types';
import type { ReactNode } from 'react';
import React, { useCallback, useState } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { EditorBlock, HtmlInjection } from '#components';
import { PlayButton } from '#icons';

import { removeVideo, updateVideo } from '../transforms';

import styles from './VideoElement.module.scss';
import { type FormState, VideoMenu } from './VideoMenu';

interface Props extends RenderElementProps {
    element: VideoNode;
    mode: 'iframe' | 'thumbnail';
    withLayoutControls: boolean;
}

export function VideoElement({ attributes, children, element, mode, withLayoutControls }: Props) {
    const editor = useSlateStatic();

    const { url, oembed } = element;
    const [isHtmlEmbeddedWithErrors, setHtmlEmbeddedWithErrors] = useState<boolean>(false);

    const handleUpdate = useCallback(
        (patch: Partial<FormState>) => {
            updateVideo(editor, element, patch);
        },
        [editor, element],
    );
    const handleRemove = useCallback(() => {
        removeVideo(editor, element);
    }, [editor, element]);

    return (
        <EditorBlock
            {...attributes}
            element={element}
            overlay="always"
            layout={element.layout ?? 'contained'}
            // We have to render children or Slate will fail when trying to find the node.
            renderAboveFrame={children}
            renderMenu={
                withLayoutControls
                    ? ({ onClose }) => (
                          <VideoMenu
                              onChange={handleUpdate}
                              onClose={onClose}
                              onRemove={handleRemove}
                              url={element.url}
                              value={{ layout: element.layout }}
                          />
                      )
                    : undefined
            }
            renderReadOnlyFrame={() => (
                <div className={styles.Container}>
                    {!isHtmlEmbeddedWithErrors &&
                    oembed.type === 'video' &&
                    oembed.html &&
                    mode === 'iframe' ? (
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
            )}
            void
        />
    );
}

function Thumbnail(props: { src?: string; width?: number; height?: number }) {
    const { src, width, height } = props;
    if (!src) {
        return <ThumbnailPlaceholder />;
    }

    const paddingBottom = width && height ? `${Math.round((100 * height) / width)}%` : undefined;
    return (
        <div className={styles.Thumbnail} style={{ paddingBottom }}>
            <img className={styles.ThumbnailImage} src={src} alt="Video thumbnail" />
        </div>
    );
}

function ThumbnailPlaceholder() {
    return <div className={styles.ThumbnailPlaceholder} />;
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
        <ExternalLink href={props.href} className={styles.PlayButtonOverlay}>
            <PlayButton className={styles.PlayButtonIcon} />
        </ExternalLink>
    );
}
