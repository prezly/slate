import type { Editor } from 'slate';

import type { FlashNodesEditor } from './FlashNodesEditor';

export function withFlashNodes<T extends Editor>(editor: T): T & FlashNodesEditor {
    const candidate: T & Partial<FlashNodesEditor> = editor;

    const {
        nodesToFlash = [],
        flashNodes = (from, to) => {
            if (!from || !to) {
                return;
            }

            nodesToFlash.push([from, to]);
        },
    } = candidate;

    return Object.assign(editor, { nodesToFlash, flashNodes: flash });
}
