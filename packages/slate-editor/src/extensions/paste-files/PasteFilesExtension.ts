import type { Extension } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate-common';

import { withFilesPasting } from './lib';

export const EXTENSION_ID = 'PasteFilesExtension';

export interface Parameters {
    onFilesPasted?: (editor: SlateEditor, files: File[]) => void;
}

export function PasteFilesExtension({ onFilesPasted }: Parameters = {}): Extension {
    return {
        id: EXTENSION_ID,
        withOverrides: withFilesPasting({ onFilesPasted }),
    };
}
