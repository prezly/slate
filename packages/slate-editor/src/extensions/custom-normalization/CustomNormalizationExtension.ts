import type { Extension } from '@prezly/slate-commons';
import { useRegisterExtension } from '@prezly/slate-commons';

export const EXTENSION_ID = 'CustomNormalizationExtension';

export type ExtensionConfiguration = Pick<Extension, 'normalizeNode'>;

export function CustomNormalizationExtension({ normalizeNode }: ExtensionConfiguration) {
    return useRegisterExtension({
        id: EXTENSION_ID,
        normalizeNode,
    });
}
