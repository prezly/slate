import OEmbedInfoType from './OEmbedInfoType';

export default interface OEmbedInfo {
    author_name?: string;
    author_url?: string;
    cache_age?: number;
    description?: string;
    height?: number;
    html?: string;
    provider_name?: string;
    provider_url?: string;
    screenshot_url?: string;
    thumbnail_height?: string;
    thumbnail_url?: string;
    thumbnail_width?: string;
    title?: string;
    type: OEmbedInfoType;
    url: string;
    version: '1.0';
    width?: number;
}
