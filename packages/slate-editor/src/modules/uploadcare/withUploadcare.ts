import type { SlateEditor } from '@udecode/plate-common';

import { UPLOADCARE_PROPERTY } from './constants';
import type { Uploadcare } from './types';

export function withUploadcare(uploads: Uploadcare) {
    return <T extends SlateEditor>(editor: T): T => {
        return Object.defineProperty(editor, UPLOADCARE_PROPERTY, { value: uploads });
    };
}
