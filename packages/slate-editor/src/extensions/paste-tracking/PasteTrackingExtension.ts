import type { DataTransferHandler } from '@prezly/slate-commons';
import { useRegisterExtension } from '@prezly/slate-commons';
import { useCallback } from 'react';

import { useLatest } from '#lib';

export const EXTENSION_ID = 'PasteTrackingExtension';

export interface Parameters {
    onPaste(dataTransfer: DataTransfer): void;
}

export function PasteTrackingExtension({ onPaste }: Parameters) {
    const callback = useLatest({ onPaste });

    const insertData = useCallback<DataTransferHandler>((dataTransfer, next) => {
        callback.current.onPaste(dataTransfer);
        next(dataTransfer);
    }, []);

    return useRegisterExtension({
        id: EXTENSION_ID,
        insertData,
    });
}
