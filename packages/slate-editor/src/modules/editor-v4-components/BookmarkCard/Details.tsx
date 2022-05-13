import type { PropsWithChildren } from 'react';
import React from 'react';

import { utils, stripTags } from '#lib';

import styles from './BookmarkCard.module.scss';

interface DetailsProps {
    title?: string;
    description?: string;
    href: string;
}

export function Details({ title, description, href, children }: PropsWithChildren<DetailsProps>) {
    return (
        <div className={styles.details}>
            {!utils.isEmptyText(title) && (
                <a className={styles.title} href={href} rel="noopener noreferrer" target="_blank">
                    {stripTags(title)}
                </a>
            )}

            {!utils.isEmptyText(description) && (
                <div className={styles.description}>{stripTags(description)}</div>
            )}

            {children}
        </div>
    );
}
