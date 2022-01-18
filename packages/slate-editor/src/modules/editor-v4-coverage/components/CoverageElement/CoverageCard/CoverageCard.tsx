import type { Contact, Coverage } from '@prezly/sdk';
import moment from 'moment';
import type { FunctionComponent } from 'react';
import React from 'react';

import { formatBytes } from '#lib';

import { getCoverageImageUrl } from './lib';

import './CoverageBlock.scss';

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
        <div className="editor-v4-coverage-card">
            {imageUrl && <Thumbnail src={imageUrl} href={href} />}

            <div className="editor-v4-coverage-card__details">
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
            className="editor-v4-coverage-card__thumbnail"
            style={{ backgroundImage: `url("${src}")` }}
        >
            <img
                className="editor-v4-coverage-card__thumbnail-image"
                src={src}
                alt="Website preview"
            />
        </Tag>
    );
}

function Title(props: { coverage: Coverage; href: string | null }) {
    const { coverage, href } = props;
    const title = coverage.attachment_oembed?.title || coverage.attachment?.filename || 'Untitled';
    const Tag = href ? 'a' : 'div';

    return (
        <Tag className="editor-v4-coverage-card__title" href={href || undefined}>
            {title}
        </Tag>
    );
}

function Description(props: { coverage: Coverage }) {
    const { coverage } = props;

    const description = coverage.attachment_oembed?.description;

    if (description) {
        return <div className="editor-v4-coverage-card__description">{description}</div>;
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
        <div className="editor-v4-coverage-card__meta">
            {author?.display_name && (
                <span className="editor-v4-coverage-card__author" title="Author">
                    {author?.display_name}
                </span>
            )}
            {date && (
                <span className="editor-v4-coverage-card__publication-date">
                    {moment(date).format(dateFormat)}
                </span>
            )}
        </div>
    );
}

function Outlet(props: { contact: Contact }) {
    const { contact } = props;

    return (
        <div className="editor-v4-coverage-card__outlet">
            <img
                className="editor-v4-coverage-card__outlet-icon"
                src={contact.avatar_url}
                alt={`${contact.display_name} avatar`}
                aria-hidden="true"
            />
            <span className="editor-v4-coverage-card__outlet-name">{contact.display_name}</span>
        </div>
    );
}
