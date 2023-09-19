import type { Extension } from '@prezly/slate-commons';

import { withImagesPasting } from './lib';

export const EXTENSION_ID = 'PasteImagesExtension';

export interface Parameters {
    fallbackAttachments?: boolean;
}

export function PasteImagesExtension({ fallbackAttachments }: Parameters = {}): Extension {
    return {
        id: EXTENSION_ID,
        withOverrides: withImagesPasting({ fallbackAttachments }),
    };
}
