import { Editor, Element, Transforms } from 'slate';

import type { ListsEditor } from '../types';
import type { ListType } from '../types';

/**
 * All nodes matching `isConvertibleToListTextNode()` in the current selection
 * will be converted to list items and then wrapped in lists.
 *
 * @see ListsEditor.isConvertibleToListTextNode()
 */
export function wrapInList(editor: ListsEditor, listType: ListType): void {
    if (!editor.selection) {
        return;
    }

    const nonListEntries = Array.from(
        Editor.nodes(editor, {
            at: editor.selection,
            match: (node) => {
                return (
                    Element.isElement(node) &&
                    !editor.isListNode(node) &&
                    !editor.isListItemNode(node) &&
                    !editor.isListItemTextNode(node) &&
                    editor.isConvertibleToListTextNode(node)
                );
            },
        }),
    );

    const refs = nonListEntries.map(([_, path]) => Editor.pathRef(editor, path));

    refs.forEach((ref) => {
        const path = ref.current;
        if (path) {
            Editor.withoutNormalizing(editor, () => {
                Transforms.setNodes(editor, editor.createListItemTextNode(), { at: path });
                Transforms.wrapNodes(editor, editor.createListItemNode(), { at: path });
                Transforms.wrapNodes(editor, editor.createListNode(listType), { at: path });
            });
        }
        ref.unref();
    });
}
