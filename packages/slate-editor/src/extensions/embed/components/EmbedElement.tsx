import type { EmbedNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { useState } from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock, HtmlInjection, ImageWithLoadingPlaceholderV2 } from '#components';
import { Embed } from '#icons';

import styles from './EmbedElement.module.scss';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: EmbedNode;
    showAsScreenshot: boolean;
}

export function EmbedElement({ attributes, children, element, showAsScreenshot }: Props) {
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const isUsingScreenshots = showAsScreenshot && element.oembed.type !== 'link';

    return (
        <EditorBlock
            {...attributes}
            element={element}
            hasError={isInvalid}
            overlay="autohide"
            renderBlock={function () {
                if (isUsingScreenshots && element.oembed.screenshot_url) {
                    return (
                        <ImageWithLoadingPlaceholderV2
                            src={element.oembed.screenshot_url}
                            icon={Embed}
                            description="Loading embed"
                            imageWidth={element.oembed.thumbnail_width ?? 1600}
                            imageHeight={element.oembed.thumbnail_height ?? 900}
                        />
                    );
                }

                if (isInvalid) {
                    return (
                        <div className={styles.Error}>
                            There was a problem loading the requested URL.
                        </div>
                    );
                }

                return (
                    <HtmlInjection
                        className={classNames(styles.Content, {
                            [styles.video]: element.oembed.type === 'video',
                        })}
                        html={element.oembed.html ?? ''}
                        onError={() => setIsInvalid(true)}
                    />
                );
            }}
            rounded
            void
        >
            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </EditorBlock>
    );
}
