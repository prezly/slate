import { stubTrue } from '@technically/lodash';
import { ElementApi, type NodeEntry, type SlateEditor } from '@udecode/plate';

export function unwrapNode(
    editor: SlateEditor,
    [node, path]: NodeEntry,
    match: (entry: NodeEntry, ancestor: NodeEntry) => boolean = stubTrue,
) {
    const ancestor = editor.api.above({ at: path });

    if (!ancestor) {
        return false;
    }

    const [ancestorNode] = ancestor;

    if (!ElementApi.isElement(ancestorNode)) {
        return false;
    }

    if (match([node, path], ancestor)) {
        editor.tf.unwrapNodes({ at: path });
        return true;
    }

    return false;
}
