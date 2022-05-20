import React from 'react';

import styles from './BookmarkCard.module.scss';

interface ProviderProps {
    url: string;
    providerUrl?: string;
    providerName?: string;
    showUrl: boolean;
}

export function Provider({ url, providerUrl, providerName, showUrl }: ProviderProps) {
    const favicon = `https://avatars-cdn.prezly.com/favicon?url=${url}?ideal_height=32`;
    const href = showUrl ? url : homepage(providerUrl || url);
    const provider = showUrl ? url : providerName || hostname(providerUrl || url);

    return (
        <a className={styles.provider} rel="noopener noreferrer" target="_blank" href={href}>
            <img
                className={styles.providerIcon}
                src={favicon}
                alt={`${provider} favicon`}
                aria-hidden="true"
            />
            <span className={styles.providerName}>{provider}</span>
        </a>
    );
}

function hostname(url: string): string {
    const { host } = new URL(url);
    return host;
}

function homepage(url: string): string {
    const { origin } = new URL(url);
    return origin;
}
