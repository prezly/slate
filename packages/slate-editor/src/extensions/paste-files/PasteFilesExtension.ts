import { useRegisterExtension } from '@prezly/slate-commons';
import { noop } from '@technically/lodash';
import { useMemo } from 'react';
import type { Editor } from 'slate';
import { useSlateStatic } from 'slate-react';

import { useLatest } from '#lib';

import { createDataTransferHandler } from './lib';

export const EXTENSION_ID = 'PasteFilesExtension';

export interface Parameters {
    onFilesPasted?: (editor: Editor, files: File[]) => void;
}

export function PasteFilesExtension({ onFilesPasted = noop }: Parameters = {}) {
    const editor = useSlateStatic();
    const callbacks = useLatest({ onFilesPasted });
    const insertData = useMemo(() => {
        return createDataTransferHandler(editor, {
            onFilesPasted: (editor, files) => {
                callbacks.current.onFilesPasted(editor, files);
            },
        });
    }, []);

    return useRegisterExtension({
        id: EXTENSION_ID,
        insertData,
    });
}
