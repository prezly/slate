import type { FilePromise } from '@prezly/uploadcare-widget';
import uploadcare from '@prezly/uploadcare-widget';
import isDataURI from 'validator/lib/isDataURI';

import { dataUriToFile } from '#lib';

export function toFilePromise(src: string): FilePromise | null {
    if (src.startsWith('file://')) {
        // We don't know how to deal with this data
        return null;
    }

    if (isDataURI(src)) {
        try {
            return uploadcare.fileFrom('object', dataUriToFile(src));
        } catch (error) {
            // We don't know how to deal with this data
            return null;
        }
    }

    return uploadcare.fileFrom('url', src);
}
