import type { ListItemNode, ListItemTextNode, ListNode } from '@prezly/slate-types';
import {
    BULLETED_LIST_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    isListNode,
    isListItemNode,
    isListItemTextNode,
} from '@prezly/slate-types';

import { createList, createListItem, createListItemText } from './create';

export function parseList(
    serialized: string,
): ListNode | ListItemNode | ListItemTextNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isListNode(parsed, NUMBERED_LIST_NODE_TYPE)) {
        return createList(parsed);
    }

    if (isListNode(parsed, BULLETED_LIST_NODE_TYPE)) {
        return createList(parsed);
    }

    return undefined;
}

export function parseListItem(serialized: string): ListItemNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isListItemNode(parsed)) {
        return createListItem(parsed);
    }

    return undefined;
}

export function parseListItemText(serialized: string): ListItemTextNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isListItemTextNode(parsed)) {
        return createListItemText(parsed);
    }

    return undefined;
}
