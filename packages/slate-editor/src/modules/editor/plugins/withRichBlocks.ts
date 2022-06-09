import type { Extension } from '@prezly/slate-commons';
import type { BaseEditor, Node } from 'slate';

export interface RichBlocksAwareEditor extends BaseEditor {
    isRichBlock(node: Node): boolean;
}

export function withRichBlocks(getExtensions: () => Extension[]) {
    return function <T extends BaseEditor>(editor: T): T & RichBlocksAwareEditor {
        function isRichBlock(node: Node) {
            for (const extension of getExtensions()) {
                if (extension.isRichBlock?.(node)) return true;
            }
            return false;
        }

        return Object.assign(editor, {
            isRichBlock,
        });
    };
}
