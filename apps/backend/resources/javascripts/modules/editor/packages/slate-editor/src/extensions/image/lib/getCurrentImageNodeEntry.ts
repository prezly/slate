import { EditorCommands } from '@prezly/slate-commons';
import type { ImageNode } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';
import type { NodeEntry, SlateEditor } from '@udecode/plate';

export function getCurrentImageNodeEntry(editor: SlateEditor): NodeEntry<ImageNode> | null {
    const currentNodeEntry = EditorCommands.getCurrentNodeEntry(editor);
    if (currentNodeEntry && isImageNode(currentNodeEntry[0])) {
        return currentNodeEntry as NodeEntry<ImageNode>;
    }

    return null;
}
