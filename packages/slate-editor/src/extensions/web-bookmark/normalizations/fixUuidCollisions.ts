import { BookmarkNode } from '@prezly/slate-types';
import type { NodeEntry } from 'slate';
import { Editor, Path, Transforms } from 'slate';
import * as uuid from 'uuid';

export function fixUuidCollisions(editor: Editor, [node, path]: NodeEntry): boolean {
    if (BookmarkNode.isBookmarkNode(node)) {
        const [dupe] = Editor.nodes(editor, {
            at: [],
            match: (anotherNode, anotherPath) =>
                BookmarkNode.isBookmarkNode(anotherNode) &&
                anotherNode.uuid === node.uuid &&
                !Path.equals(path, anotherPath),
        });

        if (dupe) {
            Transforms.setNodes<BookmarkNode>(editor, { uuid: uuid.v4() }, { at: path });
            return true;
        }
    }

    return false;
}
