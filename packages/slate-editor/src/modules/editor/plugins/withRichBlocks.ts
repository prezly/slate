import type { Extension } from '@prezly/slate-commons';
import type { Node, SlateEditor } from '@udecode/plate';

export interface RichBlocksAwareEditor {
    isRichBlock(node: Node): boolean;
}

export function withRichBlocks(getExtensions: () => Extension[]) {
    return function <T extends SlateEditor>(editor: T): T & RichBlocksAwareEditor {
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
