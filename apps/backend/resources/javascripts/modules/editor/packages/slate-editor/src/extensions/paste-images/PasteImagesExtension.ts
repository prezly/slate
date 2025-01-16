import type { Extension } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate';

import { withImagesPasting } from './lib';

export const EXTENSION_ID = 'PasteImagesExtension';

export interface Parameters {
    onImagesPasted?: (editor: SlateEditor, images: File[]) => void;
}

export function PasteImagesExtension({ onImagesPasted }: Parameters = {}): Extension {
    return {
        id: EXTENSION_ID,
        withOverrides: withImagesPasting({ onImagesPasted }),
    };
}
