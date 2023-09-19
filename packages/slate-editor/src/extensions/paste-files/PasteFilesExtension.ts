import { useRegisterExtension } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import { withFilesPasting } from './lib';

export const EXTENSION_ID = 'PasteFilesExtension';

export interface Parameters {
    onFilesPasted?: (editor: Editor, files: File[]) => void;
}

export function PasteFilesExtension({ onFilesPasted }: Parameters = {}) {
    return useRegisterExtension({
        id: EXTENSION_ID,
        withOverrides: withFilesPasting({ onFilesPasted }),
    });
}
