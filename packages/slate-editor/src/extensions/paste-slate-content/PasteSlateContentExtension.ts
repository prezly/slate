import type { Extension } from '@prezly/slate-commons';

import { withSlatePasting } from './lib';

export const EXTENSION_ID = PasteSlateContentExtension.name;

export function PasteSlateContentExtension(): Extension {
    return {
        id: EXTENSION_ID,
        withOverrides: withSlatePasting,
    };
}
