import type { Extension } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import { withImagesPasting } from './lib';

export const EXTENSION_ID = 'PasteImagesExtension';

export interface Parameters {
    fallbackAttachments?: boolean;
    onImagesPasted?: (editor: Editor, images: File[]) => void;
}

export function PasteImagesExtension({
    fallbackAttachments,
    onImagesPasted,
}: Parameters = {}): Extension {
    return {
        id: EXTENSION_ID,
        withOverrides: withImagesPasting({ fallbackAttachments, onImagesPasted }),
    };
}
