import type { EmbedNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';

import { ImageWithLoadingPlaceholderV2, LoadingPlaceholderV2 } from '../../../../components';
import { Embed } from '../../../../icons';
import { injectOembedMarkup } from '../../lib';

import './EmbedElement.scss';

interface Props extends RenderElementProps {
    availableWidth: number;
    element: EmbedNode;
    showAsScreenshot: boolean;
}

const EmbedElement: FunctionComponent<Props> = ({
    availableWidth,
    attributes,
    children,
    element,
    showAsScreenshot,
}) => {
    const isSelected = useSelected();
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
        <div
            {...attributes}
            className={classNames('editor-v4-embed-element', {
                'editor-v4-embed-element--active': isSelected,
                'editor-v4-embed-element--invalid': isInvalid,
                'editor-v4-embed-element--video': element.oembed.type === 'video',
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
        >
            <div contentEditable={false}>
                {isUsingScreenshots && element.oembed.screenshot_url ? (
                    <ImageWithLoadingPlaceholderV2
                        availableWidth={availableWidth}
                        className="editor-v4-embed-element__loading-placeholder"
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
                        <div
                            className={classNames('editor-v4-embed-element__overlay', {
                                'editor-v4-embed-element__overlay--hidden': isSelected,
                            })}
                        />
                        {isInvalid ? (
                            <div className="editor-v4-embed-element__error">
                                There was a problem loading the requested URL.
                            </div>
                        ) : (
                            <div className="editor-v4-embed-element__content" ref={contentRef} />
                        )}
                    </>
                )}
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
};

export default EmbedElement;
