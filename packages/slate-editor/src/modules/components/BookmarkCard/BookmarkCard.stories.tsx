import type { OEmbedInfo } from '@prezly/sdk';
import * as React from 'react';

import { BookmarkCard } from './BookmarkCard';

export default {
    title: 'Modules/Components/BookmarkCard',
};

const info: OEmbedInfo = {
    type: 'link',
    version: '1.0',
    url: 'https://www.prezly.com/index',
    title: 'PR Software for better, faster PR',
    description:
        'Prezly provides software for communications teams that want to do more. Manage your media relations, create online newsrooms, and publish and pitch your stories from one place.',
    provider_name: 'Prezly.com',
    thumbnail_url:
        'https://cdn.uc.assets.prezly.com/ab836005-6e93-4c98-bbca-a39cf50e0a78/twitter_card.png',
    thumbnail_width: 1500,
    thumbnail_height: 500,
};

export function Horizontal() {
    return (
        <div style={{ width: 680 }}>
            <BookmarkCard layout="horizontal" oembed={info} withThumbnail />
        </div>
    );
}

export function Vertical() {
    return (
        <div style={{ width: 680 }}>
            <BookmarkCard layout="vertical" oembed={info} withThumbnail />
        </div>
    );
}

export function Minimal() {
    const oembed: OEmbedInfo = {
        type: 'link',
        version: '1.0',
        url: 'https://www.facebook.com/PrezlyPR/posts/pfbid0zinDzc7t9pLwkEtdVAbcZgoeZ792csmyVGgUgz2eFB1fjz3yoYbuvbenXPJSN4tDl?__cft__[0]=AZUWtBN4H5i0AnIfCYHAwa3J0rXPydGcCaAJ4R9IvZCdTWLp_dbPZ3lNcVFKMONxsPfV3CATYts4iXNLvNU0dvsMJskip5faSIg35v-gFL8CMGCCE_SD2kLtjmFFvbx2RyJ3rw-sREgFrp9NheKji-SzfhQMR0UNzICq2e18tYJ3p_tRWGS-3Z-u5X7gA89Ox1U&__tn__=%2CO%2CP-R',
    };
    return (
        <div style={{ width: 680 }}>
            <BookmarkCard border layout="vertical" withThumbnail={false} oembed={oembed} />
        </div>
    );
}
