import type { DataTransferHandler } from '@prezly/slate-commons';
import { useRegisterExtension } from '@prezly/slate-commons';
import { useMemo } from 'react';
import { useSlateStatic } from 'slate-react';

import { useLatest } from '#lib';

import { createDataTransferHandler } from './lib';
import type { IsPreservedBlock } from './types';

export const EXTENSION_ID = 'PasteSlateContentExtension';

interface Parameters {
    /**
     * Defines which blocks should be preserved, if pasted empty content.
     */
    isPreservedBlock?: IsPreservedBlock;
}

export function PasteSlateContentExtension({ isPreservedBlock = alwaysFalse }: Parameters = {}) {
    const editor = useSlateStatic();
    const callbacks = useLatest({ isPreservedBlock });

    const insertData = useMemo<DataTransferHandler>(() => {
        return createDataTransferHandler(editor, callbacks.current.isPreservedBlock);
    }, []);

    return useRegisterExtension({
        id: EXTENSION_ID,
        insertData,
    });
}

function alwaysFalse() {
    return false;
}
