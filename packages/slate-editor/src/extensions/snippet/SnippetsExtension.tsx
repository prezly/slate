import type { Extension } from '@prezly/slate-commons';

import type { SnippetsExtensionParameters } from './types';

export const EXTENSION_ID = 'SnippetsExtension';

export const SnippetsExtension = (_params: SnippetsExtensionParameters): Extension => ({
    id: EXTENSION_ID,
});
