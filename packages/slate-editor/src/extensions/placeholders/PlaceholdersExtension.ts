import type { Extension } from '@prezly/slate-commons';

export const EXTENSION_ID = 'PlaceholdersExtension';

export function PlaceholdersExtension(): Extension {
    return {
        id: EXTENSION_ID,
    };
}
