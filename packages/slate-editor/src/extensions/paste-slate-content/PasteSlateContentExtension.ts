import type { Extension } from '@prezly/slate-commons';

import { withSlatePasting } from './lib';
import type { IsPreservedBlock } from './lib/withSlatePasting';

export const EXTENSION_ID = 'PasteSlateContentExtension';

interface Options {
    /**
     * Defines which blocks should be preserved, if pasted empty content.
     */
    isPreservedBlock?: IsPreservedBlock;
}

export function PasteSlateContentExtension({
    isPreservedBlock = () => false,
}: Options = {}): Extension {
    return {
        id: EXTENSION_ID,
        withOverrides: withSlatePasting(isPreservedBlock),
    };
}
