import type { VideoNode } from '@prezly/slate-types';
import type { ReactNode } from 'react';
import React, { useState } from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock, HtmlInjection } from '#components';
import { PlayButton } from '#icons';

import styles from './VideoElement.module.scss';

interface Props extends RenderElementProps {
    element: VideoNode;
}

export function VideoElement({ attributes, children, element }: Props) {
    const { url, oembed } = element;
    const [isHtmlEmbeddedWithErrors, setHtmlEmbeddedWithErrors] = useState<boolean>(false);

    return (
        <EditorBlock
            {...attributes}
            element={element}
            overlay="autohide"
            renderBlock={() => (
                <div className={styles.card}>
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
            )}
        >
            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </EditorBlock>
    );
}

function Thumbnail(props: { src?: string; width?: number; height?: number }) {
    const { src, width, height } = props;
    if (!src) {
        return <ThumbnailPlaceholder />;
    }

    const paddingBottom = width && height ? `${Math.round((100 * height) / width)}%` : undefined;
    return (
        <div className={styles.thumbnail} style={{ paddingBottom }}>
            <img className={styles.thumbnailImage} src={src} alt="Video thumbnail" />
        </div>
    );
}

function ThumbnailPlaceholder() {
    return <div className={styles.thumbnailPlaceholder} />;
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
        <ExternalLink href={props.href} className={styles.playButtonOverlay}>
            <PlayButton className={styles.playButtonIcon} />
        </ExternalLink>
    );
}
