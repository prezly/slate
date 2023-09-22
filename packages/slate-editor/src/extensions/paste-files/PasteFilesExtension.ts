import { useRegisterExtension } from '@prezly/slate-commons';
import { noop } from '@technically/lodash';
import { useMemo } from 'react';
import { useSlateStatic } from 'slate-react';

import { useLatest } from '#lib';

import { createDataTransferHandler } from './lib';

export const EXTENSION_ID = 'PasteFilesExtension';

export interface Parameters {
    onFilesPasted?: (files: File[]) => void;
}

export function PasteFilesExtension({ onFilesPasted = noop }: Parameters = {}) {
    const editor = useSlateStatic();
    const callbacks = useLatest({ onFilesPasted });
    const insertData = useMemo(() => {
        return createDataTransferHandler(editor, {
            onFilesPasted: (files) => {
                callbacks.current.onFilesPasted(files);
            },
        });
    }, []);

    return useRegisterExtension({
        id: EXTENSION_ID,
        insertData,
    });
}
