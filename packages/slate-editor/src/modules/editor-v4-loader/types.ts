import { Element } from 'slate';

import { LOADER_TYPE } from './constants';

export type LoaderType = typeof LOADER_TYPE;

export enum LoaderContentType {
    ATTACHMENT = 'attachment',
    EMBED = 'embed',
    GALLERY = 'gallery',
    IMAGE = 'image',
    VIDEO = 'video',
}

export interface LoaderElementType extends Element {
    contentType: LoaderContentType;
    id: string;
    message: string;
    type: LoaderType;
}

export interface LoaderParameters {
    onOperationEnd: () => void;
    onOperationStart: () => void;
}
