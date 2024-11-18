import { stubTrue } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate-common';
import { Element } from 'slate';
import type { NodeEntry, Ancestor } from 'slate';

export function unwrapNode(
    editor: SlateEditor,
    [node, path]: NodeEntry,
    match: (entry: NodeEntry, ancestor: NodeEntry<Ancestor>) => boolean = stubTrue,
) {
    const ancestor = editor.above({ at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!Element.isElement(ancestorNode)) {
        return false;
    }

    if (match([node, path], ancestor)) {
        editor.unwrapNodes({ at: path });
        return true;
    }

    return false;
}
