import { ElementApi, type Location, type SlateEditor } from '@udecode/plate';

import type { ListsSchema, ListType } from '../types';

/**
 * All nodes matching `isConvertibleToListTextNode()` in the current selection
 * will be converted to list items and then wrapped in lists.
 *
 * @see ListsSchema.isConvertibleToListTextNode()
 */
export function wrapInList(
    editor: SlateEditor,
    schema: ListsSchema,
    listType: ListType,
    at: Location | null = editor.selection,
): boolean {
    if (!at) {
        return false;
    }

    const nonListEntries = Array.from(
        editor.api.nodes({
            at,
            match: (node) => {
                return (
                    ElementApi.isElement(node) &&
                    !schema.isListNode(node) &&
                    !schema.isListItemNode(node) &&
                    !schema.isListItemTextNode(node) &&
                    schema.isConvertibleToListTextNode(node)
                );
            },
        }),
    );

    if (nonListEntries.length === 0) {
        return false;
    }

    const refs = nonListEntries.map(([_, path]) => editor.api.pathRef(path));

    refs.forEach((ref) => {
        const path = ref.current;
        if (path) {
            editor.tf.withoutNormalizing(() => {
                editor.tf.setNodes(schema.createListItemTextNode(), { at: path });
                editor.tf.wrapNodes(schema.createListItemNode(), { at: path });
                editor.tf.wrapNodes(schema.createListNode(listType), { at: path });
            });
        }
        ref.unref();
    });

    return true;
}
