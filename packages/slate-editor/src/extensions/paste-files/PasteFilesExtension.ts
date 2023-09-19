import type { Extension } from '@prezly/slate-commons';

import { withFilesPasting } from './lib';

export const EXTENSION_ID = 'PasteFilesExtension';

export function PasteFilesExtension(): Extension {
    return {
        id: EXTENSION_ID,
        withOverrides: withFilesPasting,
    };
}
