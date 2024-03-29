import type { Contact, CoverageEntry } from '@prezly/sdk';
import { UploadcareImage } from '@prezly/uploadcare';
import moment from 'moment';
import type { FunctionComponent } from 'react';
import React from 'react';

import { formatBytes } from '#lib';

import styles from './CoverageCard.module.scss';

const IMAGE_HEIGHT = 180;

interface Props {
    coverage: CoverageEntry;
    /**
     * Moment.js-compatible format
     */
    dateFormat: string;
}

export const CoverageCard: FunctionComponent<Props> = ({ coverage, dateFormat }) => {
    const imageUrl = getCoverageImageUrl(coverage, IMAGE_HEIGHT);
    const href = coverage.attachment_oembed?.url || coverage.url;

    return (
        <div className={styles.CoverageCard}>
            {imageUrl && <Thumbnail src={imageUrl} href={href} />}

            <div className={styles.Details}>
                <Title coverage={coverage} href={href} />

                <Description coverage={coverage} />

                {(coverage.author_contact || coverage.published_at) && (
                    <Meta
                        author={coverage.author_contact}
                        date={coverage.published_at}
                        dateFormat={dateFormat}
                    />
                )}

                {coverage.organisation_contact && (
                    <Outlet contact={coverage.organisation_contact} />
                )}
            </div>
        </div>
    );
};

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
    const title = coverage.attachment_oembed?.title || coverage.attachment?.filename || 'Untitled';
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

function Meta(props: { author: Contact | null; date: string | null; dateFormat: string }) {
    const { author, date, dateFormat } = props;

    return (
        <div className={styles.Meta}>
            {author?.display_name && (
                <span className={styles.Author} title="Author">
                    {author?.display_name}
                </span>
            )}
            {date && (
                <span className={styles.PublicationDate}>{moment(date).format(dateFormat)}</span>
            )}
        </div>
    );
}

function Outlet(props: { contact: Contact }) {
    const { contact } = props;

    return (
        <div className={styles.Outlet}>
            <img
                className={styles.OutletIcon}
                src={contact.avatar_url}
                alt={`${contact.display_name} avatar`}
                aria-hidden="true"
            />
            <span className={styles.OutletName}>{contact.display_name}</span>
        </div>
    );
}

function getCoverageImageUrl(coverage: CoverageEntry, imageHeight: number): string | null {
    if (coverage.attachment_oembed && coverage.attachment_oembed.thumbnail_url) {
        return coverage.attachment_oembed.thumbnail_url;
    }

    if (UploadcareImage.isPrezlyStoragePayload(coverage.attachment)) {
        const image = UploadcareImage.createFromPrezlyStoragePayload(coverage.attachment);

        return image.resize(null, imageHeight).cdnUrl;
    }

    return null;
}
