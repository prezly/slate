import { useRegisterExtension } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import { withImagesPasting } from './lib';

export const EXTENSION_ID = 'PasteImagesExtension';

export interface Parameters {
    onImagesPasted?: (editor: Editor, images: File[]) => void;
}

export function PasteImagesExtension({ onImagesPasted }: Parameters = {}) {
    return useRegisterExtension({
        id: EXTENSION_ID,
        withOverrides: withImagesPasting({ onImagesPasted }),
    });
}
