import { v4 as uuidV4 } from 'uuid';

import { LOADER_TYPE } from '../constants';
import type { LoaderContentType, LoaderNode } from '../types';

interface Parameters {
    contentType: LoaderContentType;
    id?: string;
    message: string;
}

export function createLoader({ contentType, id = uuidV4(), message }: Parameters): LoaderNode {
    return {
        children: [{ text: '' }],
        contentType,
        id,
        message,
        type: LOADER_TYPE,
    };
}
