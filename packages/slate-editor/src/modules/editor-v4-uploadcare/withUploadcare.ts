import type { Editor } from 'slate';

import { UPLOADCARE_PROPERTY } from './constants';
import type { Uploadcare } from './types';

const withUploadcare = (uploads: Uploadcare) => {
    return <T extends Editor>(editor: T): T => {
        return Object.defineProperty(editor, UPLOADCARE_PROPERTY, { value: uploads });
    };
};

export default withUploadcare;
