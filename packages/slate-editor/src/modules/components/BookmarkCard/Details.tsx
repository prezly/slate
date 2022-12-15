import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import React from 'react';

import { utils, stripTags } from '#lib';

import styles from './BookmarkCard.module.scss';

interface DetailsProps {
    hasThumbnail: boolean;
    layout: 'vertical' | 'horizontal';
    title?: string;
    description?: string;
    href: string;
}

export function Details({
    title,
    description,
    href,
    children,
    layout,
    hasThumbnail,
}: PropsWithChildren<DetailsProps>) {
    const { isDescriptionShort, isTitleShort } = useMemo(() => {
        let titleOneLineLength;
        let descriptionOneLineLength;

        if (layout === 'vertical' || !hasThumbnail) {
            titleOneLineLength = 52;
            descriptionOneLineLength = 75;
        } else {
            titleOneLineLength = 33;
            descriptionOneLineLength = 45;
        }

        return {
            isTitleShort: (title ?? '').length <= titleOneLineLength,
            isDescriptionShort: (description ?? '')?.length <= descriptionOneLineLength,
        };
    }, [title, description, layout, hasThumbnail]);

    return (
        <div
            className={classNames(styles.details, {
                [styles.isTitleShort]: isTitleShort,
                [styles.isDescriptionShort]: isDescriptionShort,
            })}
        >
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
