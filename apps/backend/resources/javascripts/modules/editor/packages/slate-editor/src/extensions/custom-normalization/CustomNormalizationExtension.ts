import type { Extension } from '@prezly/slate-commons';

export const EXTENSION_ID = 'CustomNormalizationExtension';

export type ExtensionConfiguration = Pick<Extension, 'normalizeNode'>;

export function CustomNormalizationExtension({ normalizeNode }: ExtensionConfiguration): Extension {
    return {
        id: EXTENSION_ID,
        normalizeNode,
    };
}
