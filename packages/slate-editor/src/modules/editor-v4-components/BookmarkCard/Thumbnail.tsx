import React from 'react';

import styles from './BookmarkCard.module.scss';

interface ThumbnailProps {
    href: string;
    src: string;
    width?: number;
    height?: number;
}

export function Thumbnail({ href, src, width, height }: ThumbnailProps) {
    return (
        <a href={href} className={styles.thumbnail} style={{ backgroundImage: `url("${src}")` }}>
            <img
                className={styles['thumbnail-image']}
                src={src}
                width={width}
                height={height}
                alt="Website preview"
            />
        </a>
    );
}
