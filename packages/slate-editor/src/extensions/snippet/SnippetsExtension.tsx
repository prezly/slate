import { useRegisterExtension } from '@prezly/slate-commons';

export const EXTENSION_ID = 'SnippetsExtension';

export function SnippetsExtension() {
    return useRegisterExtension({
        id: EXTENSION_ID,
    });
}
