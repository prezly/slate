import { stubTrue } from '@technically/lodash';
import {
    getAboveNode,
    isElement,
    type SlateEditor,
    type TAncestor,
    type TNodeEntry,
} from '@udecode/plate-common';

export function unwrapNode(
    editor: SlateEditor,
    [node, path]: TNodeEntry,
    match: (entry: TNodeEntry, ancestor: TNodeEntry<TAncestor>) => boolean = stubTrue,
) {
    const ancestor = getAboveNode(editor, { at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!isElement(ancestorNode)) {
        return false;
    }

    if (match([node, path], ancestor)) {
        editor.unwrapNodes({ at: path });
        return true;
    }

    return false;
}
