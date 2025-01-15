import type { SlateEditor } from '@udecode/plate';

import type { Extension } from '../types';

export function withInlineVoid(getExtensions: () => Extension[]) {
    return function <T extends SlateEditor>(editor: T) {
        const { isInline, isVoid } = editor.api;

        editor.api.isInline = (element) => {
            for (const extension of getExtensions()) {
                if (extension.isInline?.(element)) {
                    return true;
                }
            }

            return isInline(element);
        };

        editor.api.isVoid = (element) => {
            for (const extension of getExtensions()) {
                if (extension.isVoid?.(element)) {
                    return true;
                }
            }

            return isVoid(element);
        };

        return editor;
    };
}
