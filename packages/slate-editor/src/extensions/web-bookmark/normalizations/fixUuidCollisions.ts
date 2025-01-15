import { BookmarkNode } from '@prezly/slate-types';
import { PathApi, type NodeEntry, type SlateEditor } from '@udecode/plate';
import * as uuid from 'uuid';

export function fixUuidCollisions(editor: SlateEditor, [node, path]: NodeEntry): boolean {
    if (BookmarkNode.isBookmarkNode(node)) {
        const [dupe] = editor.api.nodes({
            at: [],
            match: (anotherNode, anotherPath) =>
                BookmarkNode.isBookmarkNode(anotherNode) &&
                anotherNode.uuid === node.uuid &&
                !PathApi.equals(path, anotherPath),
        });

        if (dupe) {
            editor.tf.setNodes<BookmarkNode>({ uuid: uuid.v4() }, { at: path });
            return true;
        }
    }

    return false;
}
