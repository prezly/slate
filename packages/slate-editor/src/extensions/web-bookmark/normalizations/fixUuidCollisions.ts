import { BookmarkNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';
import { Path } from 'slate';
import * as uuid from 'uuid';

export function fixUuidCollisions(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (BookmarkNode.isBookmarkNode(node)) {
        const [dupe] = editor.nodes({
            at: [],
            match: (anotherNode, anotherPath) =>
                BookmarkNode.isBookmarkNode(anotherNode) &&
                anotherNode.uuid === node.uuid &&
                !Path.equals(path, anotherPath),
        });

        if (dupe) {
            editor.setNodes<BookmarkNode>({ uuid: uuid.v4() }, { at: path });
            return true;
        }
    }

    return false;
}
