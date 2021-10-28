import { Element } from 'slate';

import { LOADER_TYPE } from './constants';

export enum LoaderContentType {
    ATTACHMENT = 'attachment',
    EMBED = 'embed',
    GALLERY = 'gallery',
    IMAGE = 'image',
    VIDEO = 'video',
}

export interface LoaderElementType extends Element {
    type: typeof LOADER_TYPE;
    contentType: LoaderContentType;
    id: string;
    message: string;
}

export interface LoaderParameters {
    onOperationEnd: () => void;
    onOperationStart: () => void;
}
