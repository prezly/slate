import { nodeIdManager } from '@prezly/slate-commons';
import { Editor, Transforms } from 'slate';

import { ListsOptions } from '../types';

import createList from './createList';
import createListItem from './createListItem';

const wrapInList = (options: ListsOptions, editor: Editor, listType: string): void => {
    if (!editor.selection) {
        return;
    }

    const listNodeTypes = [...options.listTypes, options.listItemType, options.listItemTextType];
    const nonListEntries = Array.from(
        Editor.nodes(editor, {
            at: editor.selection,
            match: (node) => {
                if (typeof node.type !== 'string') {
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
                { type: options.listItemTextType },
                { at: nonListEntryPath },
            );
            Transforms.wrapNodes(editor, createListItem(options), { at: nonListEntryPath });
            Transforms.wrapNodes(editor, createList(listType), { at: nonListEntryPath });
        });
    });
};

export default wrapInList;
