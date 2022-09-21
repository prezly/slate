import type { Extension } from '@prezly/slate-commons';

import type { SnippetExtensionParameters } from './types';

export const EXTENSION_ID = 'SnippetExtension';

export const SnippetExtension = (_params: SnippetExtensionParameters): Extension => ({
    id: EXTENSION_ID,
});
