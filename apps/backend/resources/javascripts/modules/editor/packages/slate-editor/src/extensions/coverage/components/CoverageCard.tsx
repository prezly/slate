import type { Contact, CoverageEntry } from '@prezly/sdk';
import { CoverageLayout } from '@prezly/slate-types';
import classNames from 'classnames';
import moment from 'moment';
import React from 'react';

import { formatBytes } from '#lib';

import { getCoverageImageUrl } from '../lib';

import styles from './CoverageCard.module.scss';

interface Props {
    coverage: CoverageEntry;
    /**
     * Moment.js-compatible format
     */
    dateFormat: string;
    layout: CoverageLayout;
    withThumbnail: boolean;
}

export function CoverageCard({ coverage, dateFormat, layout, withThumbnail }: Props) {
    const imageUrl = getCoverageImageUrl(coverage);
    const href = coverage.attachment_oembed?.url || coverage.url;
    const autoLayout = withThumbnail && imageUrl ? layout : CoverageLayout.HORIZONTAL;

    return (
        <div className={classNames(styles.CoverageCard, {
            [styles.horizontal]: autoLayout === CoverageLayout.HORIZONTAL,
            [styles.vertical]: autoLayout === CoverageLayout.VERTICAL,
        })}>
            {imageUrl && withThumbnail && <Thumbnail src={imageUrl} href={href} />}

            <div className={styles.Details}>
                <Title coverage={coverage} href={href} />

                <Description coverage={coverage} />

                <Meta
                    author={coverage.author_contact}
                    date={coverage.published_at}
                    dateFormat={dateFormat}
                    outlet={coverage.organisation_contact}
                />
            </div>
        </div>
    );
}

function Thumbnail(props: { href: string | null; src: string }) {
    const { href, src } = props;
    const Tag = href ? 'a' : 'div';

    return (
        <Tag
            href={href || undefined}
            className={styles.Thumbnail}
            style={{ backgroundImage: `url("${src}")` }}
        >
            <img className={styles.ThumbnailImage} src={src} alt="Website preview" />
        </Tag>
    );
}

function Title(props: { coverage: CoverageEntry; href: string | null }) {
    const { coverage, href } = props;
    const title = coverage.headline || coverage.attachment_oembed?.title || coverage.attachment?.filename || 'Untitled';
    const Tag = href ? 'a' : 'div';

    return (
        <Tag className={styles.Title} href={href || undefined}>
            {title}
        </Tag>
    );
}

function Description(props: { coverage: CoverageEntry }) {
    const { coverage } = props;

    const description = coverage.attachment_oembed?.description;

    if (description) {
        return <div className={styles.Description}>{description}</div>;
    }

    if (coverage.attachment) {
        return <div className={styles.Description}>{formatBytes(coverage.attachment.size)}</div>;
    }

    return null;
}

function Meta(props: { author: Contact | null; date: string | null; dateFormat: string, outlet: Contact | null }) {
    const { author, date, dateFormat, outlet } = props;

    const hasOutlet = outlet !== null;
    const hasAuthor = author !== null;
    const hasDate = date !== null;

    if (!hasOutlet && !hasAuthor && !hasDate) {
        return null;
    }

    return (
        <div className={styles.Meta}>
            {hasOutlet && (
                <>
                    <span className={styles.Outlet}>
                        <img
                            className={styles.OutletIcon}
                            src={outlet.avatar_url}
                            alt={`${outlet.display_name} avatar`}
                            aria-hidden="true"
                        />
                        <span className={styles.OutletName}>{outlet.display_name}</span>
                    </span>
                    {(hasAuthor || hasDate) && <span>/</span>}
                </>
            )}
            {hasAuthor && (
                <>
                    <span className={styles.Author} title="Author">
                        {author.display_name}
                    </span>
                    {hasDate && <span>/</span>}
                </>
            )}
            {hasDate && (
                <span className={styles.PublicationDate}>{moment(date).format(dateFormat)}</span>
            )}
        </div>
    );
}
