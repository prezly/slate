import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import type { InfoText } from '#components';
import { EditorBlock, HtmlInjection, ImageWithLoadingPlaceholder } from '#components';
import { Embed } from '#icons';

import { BookmarkCard } from '#modules/components';

import type { FormState } from '../../video/components/VideoMenu';
import type { EmbedNode } from '../EmbedNode';
import { removeEmbed, updateEmbed } from '../transforms';

import styles from './EmbedElement.module.scss';
import { EmbedMenu } from './EmbedMenu';

interface Props extends RenderElementProps {
    allowHtmlInjection?: boolean;
    allowScreenshots?: boolean;
    availableWidth: number;
    info?: InfoText.StructuredContent;
    element: EmbedNode;
    withMenu: boolean;
    withLayoutControls: boolean;
}

export function EmbedElement({
    allowHtmlInjection = false,
    allowScreenshots = false,
    attributes,
    children,
    element,
    info,
    withMenu,
    withLayoutControls,
}: Props) {
    const editor = useSlateStatic();

    const [isInvalid, setIsInvalid] = useState<boolean>(false);

    const handleUpdate = useCallback(
        (patch: Partial<FormState>) => {
            updateEmbed(editor, element, patch);
        },
        [editor, element],
    );
    const handleRemove = useCallback(() => {
        removeEmbed(editor, element);
    }, [editor, element]);

    return (
        <EditorBlock
            {...attributes}
            element={element}
            hasError={isInvalid}
            layout={withLayoutControls ? element.layout : undefined}
            overlay="always"
            // We have to render children or Slate will fail when trying to find the node.
            renderAboveFrame={children}
            renderMenu={
                withMenu
                    ? ({ onClose }) => (
                          <EmbedMenu
                              info={info}
                              onChange={handleUpdate}
                              onClose={onClose}
                              onRemove={handleRemove}
                              url={element.url}
                              value={{ layout: element.layout }}
                              withLayoutControls={withLayoutControls}
                          />
                      )
                    : undefined
            }
            renderReadOnlyFrame={function () {
                if (isInvalid) {
                    return (
                        <div className={styles.Error}>
                            There was a problem loading the requested URL.
                        </div>
                    );
                }

                if (allowHtmlInjection && element.oembed.html) {
                    return (
                        <HtmlInjection
                            className={classNames(styles.Content, {
                                [styles.video]: element.oembed.type === 'video',
                            })}
                            html={element.oembed.html}
                            onError={() => setIsInvalid(true)}
                        />
                    );
                }

                if (allowScreenshots && element.oembed.screenshot_url) {
                    return (
                        <ImageWithLoadingPlaceholder
                            src={element.oembed.screenshot_url}
                            icon={Embed}
                            description="Loading embed"
                            imageWidth={undefined}
                            imageHeight={undefined}
                        />
                    );
                }

                return (
                    <BookmarkCard
                        border
                        layout="vertical"
                        oembed={element.oembed}
                        withThumbnail={true}
                    />
                );
            }}
            rounded
            void
        />
    );
}
