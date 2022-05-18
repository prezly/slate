import type { Contact, Coverage } from '@prezly/sdk';
import moment from 'moment';
import type { FunctionComponent } from 'react';
import React from 'react';

import { formatBytes } from '#lib';

import styles from './CoverageCard.module.scss';
import { getCoverageImageUrl } from './lib';

const IMAGE_HEIGHT = 180;

interface Props {
    coverage: Coverage;
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

            <div className={styles.details}>
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
            className={styles.thumbnail}
            style={{ backgroundImage: `url("${src}")` }}
        >
            <img className={styles.thumbnailImage} src={src} alt="Website preview" />
        </Tag>
    );
}

function Title(props: { coverage: Coverage; href: string | null }) {
    const { coverage, href } = props;
    const title = coverage.attachment_oembed?.title || coverage.attachment?.filename || 'Untitled';
    const Tag = href ? 'a' : 'div';

    return (
        <Tag className={styles.title} href={href || undefined}>
            {title}
        </Tag>
    );
}

function Description(props: { coverage: Coverage }) {
    const { coverage } = props;

    const description = coverage.attachment_oembed?.description;

    if (description) {
        return <div className={styles.description}>{description}</div>;
    }

    if (coverage.attachment) {
        return (
            <div className="editor-v4-coverage-card__description editor-v4-coverage-card__description--secondary">
                {formatBytes(coverage.attachment.size)}
            </div>
        );
    }

    return null;
}

function Meta(props: { author: Contact | null; date: string | null; dateFormat: string }) {
    const { author, date, dateFormat } = props;

    return (
        <div className={styles.meta}>
            {author?.display_name && (
                <span className={styles.author} title="Author">
                    {author?.display_name}
                </span>
            )}
            {date && (
                <span className={styles.publicationDate}>{moment(date).format(dateFormat)}</span>
            )}
        </div>
    );
}

function Outlet(props: { contact: Contact }) {
    const { contact } = props;

    return (
        <div className={styles.outlet}>
            <img
                className={styles.outletIcon}
                src={contact.avatar_url}
                alt={`${contact.display_name} avatar`}
                aria-hidden="true"
            />
            <span className={styles.outletName}>{contact.display_name}</span>
        </div>
    );
}
