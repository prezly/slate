import { v4 as uuidV4 } from 'uuid';

import { LOADER_TYPE } from '../constants';
import type { LoaderContentType, LoaderNode } from '../types';

interface Parameters {
    contentType: LoaderContentType;
    id?: string;
    message: string;
}

const createLoader = ({ contentType, id = uuidV4(), message }: Parameters): LoaderNode => ({
    children: [{ text: '' }],
    contentType,
    id,
    message,
    type: LOADER_TYPE,
});

export default createLoader;
