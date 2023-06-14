import { Editor, Element, Transforms } from 'slate';

import type { ListsSchema, ListType } from '../types';

/**
 * All nodes matching `isConvertibleToListTextNode()` in the current selection
 * will be converted to list items and then wrapped in lists.
 *
 * @see ListsSchema.isConvertibleToListTextNode()
 */
export function wrapInList(editor: Editor, schema: ListsSchema, listType: ListType): void {
    if (!editor.selection) {
        return;
    }

    const nonListEntries = Array.from(
        Editor.nodes(editor, {
            at: editor.selection,
            match: (node) => {
                return (
                    Element.isElement(node) &&
                    !schema.isListNode(node) &&
                    !schema.isListItemNode(node) &&
                    !schema.isListItemTextNode(node) &&
                    schema.isConvertibleToListTextNode(node)
                );
            },
        }),
    );

    const refs = nonListEntries.map(([_, path]) => Editor.pathRef(editor, path));

    refs.forEach((ref) => {
        const path = ref.current;
        if (path) {
            Editor.withoutNormalizing(editor, () => {
                Transforms.setNodes(editor, schema.createListItemTextNode(), { at: path });
                Transforms.wrapNodes(editor, schema.createListItemNode(), { at: path });
                Transforms.wrapNodes(editor, schema.createListNode(listType), { at: path });
            });
        }
        ref.unref();
    });
}
