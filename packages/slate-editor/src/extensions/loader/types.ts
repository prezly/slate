import type { ElementNode } from '@prezly/slate-types';

import type { LOADER_NODE_TYPE } from './constants';

export enum LoaderContentType {
    ATTACHMENT = 'attachment',
    BOOKMARK = 'bookmark',
    EMBED = 'embed',
    GALLERY = 'gallery',
    IMAGE = 'image',
    VIDEO = 'video',
    STORY_EMBED = 'story-embed',
    STORY_BOOKMARK = 'story-bookmark',
}

export interface LoaderNode extends ElementNode {
    type: typeof LOADER_NODE_TYPE;
    contentType: LoaderContentType;
    id: string;
    message: string;
}

export interface LoaderParameters {
    onOperationEnd: () => void;
    onOperationStart: () => void;
}
