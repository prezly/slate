import type { OEmbedInfo } from '@prezly/sdk';
import React, { type Ref } from 'react';

import { utils } from '#lib';

import { Container } from './Container';
import { Details } from './Details';
import { Provider } from './Provider';
import { Thumbnail } from './Thumbnail';

export function BookmarkCard({
    border = true,
    layout,
    forwardRef,
    oembed,
    url = oembed.url,
    withThumbnail,
}: BookmarkCard.Props) {
    const isEmpty =
        !withThumbnail && utils.isEmptyText(oembed.title) && utils.isEmptyText(oembed.description);
    return (
        <Container border={border} layout={layout} forwardRef={forwardRef}>
            {withThumbnail && oembed.thumbnail_url && (
                <Thumbnail
                    href={url}
                    src={oembed.thumbnail_url}
                    width={oembed.thumbnail_width}
                    height={oembed.thumbnail_height}
                />
            )}
            <Details
                hasThumbnail={Boolean(withThumbnail && oembed.thumbnail_url)}
                layout={layout}
                href={url}
                title={oembed.title}
                description={oembed.description}
            >
                <Provider
                    showUrl={isEmpty}
                    url={url}
                    providerName={oembed.provider_name}
                    providerUrl={oembed.provider_url}
                />
            </Details>
        </Container>
    );
}

export namespace BookmarkCard {
    export interface Props {
        border?: boolean;
        forwardRef?: Ref<HTMLDivElement>;
        layout: 'vertical' | 'horizontal';
        oembed: OEmbedInfo;
        url?: string;
        withThumbnail: boolean;
    }
}
