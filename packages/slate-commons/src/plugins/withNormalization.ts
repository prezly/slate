/* eslint-disable no-param-reassign */
import type { Editor } from 'slate';

import type { Extension } from '../types';

const withNormalization =
    (getExtensions: () => Extension[]) =>
    <T extends Editor>(editor: T) => {
        const { normalizeNode } = editor;

        editor.normalizeNode = (entry) => {
            const normalizers = getExtensions().flatMap((extension) => extension.normalizers || []);

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

export default withNormalization;
