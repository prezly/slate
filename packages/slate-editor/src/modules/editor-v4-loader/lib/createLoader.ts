import uuidV4 from 'uuid/v4';

import { LOADER_TYPE } from '../constants';
import { LoaderContentType, LoaderElementType } from '../types';

interface Parameters {
    contentType: LoaderContentType;
    id?: string;
    message: string;
}

const createLoader = ({ contentType, id = uuidV4(), message }: Parameters): LoaderElementType => ({
    children: [{ text: '' }],
    contentType,
    id,
    message,
    type: LOADER_TYPE,
});

export default createLoader;
