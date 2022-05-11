import type { EmbedNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock, ImageWithLoadingPlaceholderV2, LoadingPlaceholderV2 } from '#components';
import { Embed } from '#icons';

import { injectOembedMarkup } from '../../lib';

import styles from './EmbedElement.module.scss';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: EmbedNode;
    showAsScreenshot: boolean;
}

export const EmbedElement: FunctionComponent<Props> = ({
    availableWidth,
    attributes,
    children,
    element,
    showAsScreenshot,
}) => {
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const isUsingScreenshots = showAsScreenshot && element.oembed.type !== 'link';

    useEffect(() => {
        if (!isUsingScreenshots && contentRef.current) {
            injectOembedMarkup({
                html: element.oembed.html,
                onError: () => setIsInvalid(true),
                target: contentRef.current,
            });
        }
    }, [element.oembed, isUsingScreenshots]);

    return (
        <EditorBlock
            {...attributes}
            element={element}
            hasError={isInvalid}
            overlay="autohide"
            renderBlock={() =>
                isUsingScreenshots && element.oembed.screenshot_url ? (
                    <ImageWithLoadingPlaceholderV2
                        availableWidth={availableWidth}
                        className={styles.loadingPlaceholder}
                        renderLoadingState={({ percent }) => (
                            <>
                                <LoadingPlaceholderV2.Icon icon={Embed} />
                                <LoadingPlaceholderV2.Description percent={percent}>
                                    Loading Embed
                                </LoadingPlaceholderV2.Description>
                                <LoadingPlaceholderV2.ProgressBar percent={percent} />
                            </>
                        )}
                        src={element.oembed.screenshot_url}
                    />
                ) : (
                    <>
                        {isInvalid ? (
                            <div className={styles.error}>
                                There was a problem loading the requested URL.
                            </div>
                        ) : (
                            <div
                                className={classNames(styles.content, {
                                    [styles.video]: element.oembed.type === 'video',
                                })}
                                ref={contentRef}
                            />
                        )}
                    </>
                )
            }
            void
        >
            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </EditorBlock>
    );
};
