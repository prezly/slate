import { useRegisterExtension } from '@prezly/slate-commons';
import { noop } from '@technically/lodash';
import { useMemo } from 'react';
import type { Editor } from 'slate';
import { useSlateStatic } from 'slate-react';

import { useLatest } from '#lib';

import { createDataTransferHandler } from './lib';

export const EXTENSION_ID = 'PasteImagesExtension';

export interface Parameters {
    onImagesPasted?: (editor: Editor, images: File[]) => void;
}

export function PasteImagesExtension({ onImagesPasted = noop }: Parameters = {}) {
    const editor = useSlateStatic();
    const callbacks = useLatest({ onImagesPasted });
    const insertData = useMemo(() => {
        return createDataTransferHandler(editor, {
            onImagesPasted: (editor, images) => {
                callbacks.current.onImagesPasted(editor, images);
            },
        });
    }, []);

    return useRegisterExtension({
        id: EXTENSION_ID,
        insertData,
    });
}
