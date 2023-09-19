import { useRegisterExtension } from '@prezly/slate-commons';

import type { SnippetsExtensionParameters } from './types';

export const EXTENSION_ID = 'SnippetsExtension';

// TODO: Fix unused parameter
export function SnippetsExtension(_params: SnippetsExtensionParameters) {
    return useRegisterExtension({
        id: EXTENSION_ID,
    });
}
