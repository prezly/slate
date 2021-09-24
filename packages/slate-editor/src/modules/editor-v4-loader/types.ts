import { ElementNode } from '@prezly/slate-types';

import { LOADER_TYPE } from './constants';

export type LoaderType = typeof LOADER_TYPE;

export enum LoaderContentType {
    ATTACHMENT = 'attachment',
    EMBED = 'embed',
    GALLERY = 'gallery',
    IMAGE = 'image',
    VIDEO = 'video',
}

export interface LoaderElementType extends ElementNode<LoaderType> {
    contentType: LoaderContentType;
    id: string;
    message: string;
}

export interface LoaderParameters {
    onOperationEnd: () => void;
    onOperationStart: () => void;
}
