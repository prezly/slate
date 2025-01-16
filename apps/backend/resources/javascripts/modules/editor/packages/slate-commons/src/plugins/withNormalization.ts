import type { SlateEditor } from '@udecode/plate-common';

import type { Extension } from '../types';

export function withNormalization(getExtensions: () => Extension[]) {
    return function <T extends SlateEditor>(editor: T) {
        const { normalizeNode } = editor;

        editor.normalizeNode = (entry) => {
            const normalizers = getExtensions().flatMap(({ normalizeNode = [] }) => normalizeNode);

            for (const normalizer of normalizers) {
                const normalized = normalizer(editor, entry);

                if (normalized) {
                    return;
                }
            }

            normalizeNode(entry);
        };

        return editor;
    };
}
