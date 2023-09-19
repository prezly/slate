import { createDeserializeElement, useRegisterExtension } from '@prezly/slate-commons';
import {
    ListsEditor,
    normalizeNode,
    onKeyDown,
    withListsReact,
    withListsSchema,
} from '@prezly/slate-lists';
import { TablesEditor } from '@prezly/slate-tables';
import {
    BULLETED_LIST_NODE_TYPE,
    isListItemNode,
    isListItemTextNode,
    isListNode,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
} from '@prezly/slate-types';
import React from 'react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { ListElement, ListItemElement, ListItemTextElement } from './components';
import { normalizeRedundantAttributes, parseList, parseListItem, parseListItemText } from './lib';
import { schema } from './schema';

export const EXTENSION_ID = 'ListExtension';

export function ListExtension() {
    return useRegisterExtension({
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [BULLETED_LIST_NODE_TYPE]: createDeserializeElement(parseList),
                [NUMBERED_LIST_NODE_TYPE]: createDeserializeElement(parseList),
                [LIST_ITEM_NODE_TYPE]: createDeserializeElement(parseListItem),
                [LIST_ITEM_TEXT_NODE_TYPE]: createDeserializeElement(parseListItemText),
                OL: () => ({ type: NUMBERED_LIST_NODE_TYPE }),
                UL: () => ({ type: BULLETED_LIST_NODE_TYPE }),
                LI: () => ({ type: LIST_ITEM_NODE_TYPE }),
                P: (element: HTMLElement) => {
                    if (element.parentNode?.nodeName === 'LI') {
                        return { type: LIST_ITEM_TEXT_NODE_TYPE };
                    }
                    return undefined;
                },
                DIV: (element: HTMLElement) => {
                    if (element.parentNode?.nodeName === 'LI') {
                        return { type: LIST_ITEM_TEXT_NODE_TYPE };
                    }
                    return undefined;
                },
            }),
        },
        normalizeNode: [normalizeNode, normalizeRedundantAttributes],
        onKeyDown(event, editor) {
            if (ListsEditor.isListsEnabled(editor)) {
                if (
                    TablesEditor.isTablesEditor(editor) &&
                    TablesEditor.isInTable(editor) &&
                    !ListsEditor.isAtList(editor)
                ) {
                    return;
                }

                return onKeyDown(editor, event);
            }
        },
        renderElement({ attributes, children, element }) {
            if (isListNode(element)) {
                return (
                    <ListElement {...attributes} element={element}>
                        {children}
                    </ListElement>
                );
            }
            if (isListItemNode(element)) {
                return (
                    <ListItemElement {...attributes} element={element}>
                        {children}
                    </ListItemElement>
                );
            }
            if (isListItemTextNode(element)) {
                return (
                    <ListItemTextElement {...attributes} element={element}>
                        {children}
                    </ListItemTextElement>
                );
            }
            return undefined;
        },
        withOverrides: (editor) => {
            return withListsReact(withListsSchema(schema)(editor));
        },
    });
}
