import { nodeIdManager } from '@prezly/slate-commons';
import { Editor, Element, Transforms } from 'slate';

import type { ListsOptions } from '../types';

import { createList } from './createList';
import { createListItem } from './createListItem';

/**
 * All nodes matching options.wrappableTypes in the current selection
 * will be converted to "list-items" and wrapped in "lists".
 */
export function wrapInList(options: ListsOptions, editor: Editor, listType: string): void {
    if (!editor.selection) {
        return;
    }

    const listNodeTypes = [...options.listTypes, options.listItemType, options.listItemTextType];
    const nonListEntries = Array.from(
        Editor.nodes(editor, {
            at: editor.selection,
            match: (node) => {
                if (!Element.isElement(node)) {
                    return false;
                }

                if (listNodeTypes.includes(node.type)) {
                    return false;
                }

                return options.wrappableTypes.includes(node.type);
            },
        }),
    );

    const nonListEntriesIds = nonListEntries.map((nonListEntry) => {
        return nodeIdManager.assign(editor, nonListEntry);
    });

    nonListEntriesIds.forEach((id) => {
        const nonListEntry = nodeIdManager.get(editor, id);
        nodeIdManager.unassign(editor, id);

        if (!nonListEntry) {
            // It should never happen.
            return;
        }

        const [, nonListEntryPath] = nonListEntry;
        Editor.withoutNormalizing(editor, () => {
            Transforms.setNodes(
                editor,
                { type: options.listItemTextType as Element['type'] },
                { at: nonListEntryPath },
            );
            Transforms.wrapNodes(editor, createListItem(options), { at: nonListEntryPath });
            Transforms.wrapNodes(editor, createList(listType), { at: nonListEntryPath });
        });
    });
}
