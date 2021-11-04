import { ElementNode } from '@prezly/slate-types';

import { LOADER_TYPE } from './constants';

export enum LoaderContentType {
    ATTACHMENT = 'attachment',
    EMBED = 'embed',
    GALLERY = 'gallery',
    IMAGE = 'image',
    VIDEO = 'video',
}

export interface LoaderNode extends ElementNode {
    type: typeof LOADER_TYPE;
    contentType: LoaderContentType;
    id: string;
    message: string;
}

export interface LoaderParameters {
    onOperationEnd: () => void;
    onOperationStart: () => void;
}
