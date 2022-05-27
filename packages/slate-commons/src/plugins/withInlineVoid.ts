/* eslint-disable no-param-reassign */
import type { Editor } from 'slate';

import type { Extension } from '../types';

export function withInlineVoid(getExtensions: () => Extension[]) {
    return function <T extends Editor>(editor: T) {
        const { isInline, isVoid } = editor;

        editor.isInline = (element) => {
            for (const extension of getExtensions()) {
                if (extension.isInline?.(element)) {
                    return true;
                }
            }

            return isInline(element);
        };

        editor.isVoid = (element) => {
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
