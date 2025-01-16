import type { ListNode, ListItemNode, ListItemTextNode } from '@prezly/slate-types';
import {
    BULLETED_LIST_NODE_TYPE,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
} from '@prezly/slate-types';

export function createList({ type, align, children }: Partial<ListNode> = {}): ListNode {
    return {
        type: type ?? BULLETED_LIST_NODE_TYPE,
        align,
        children: children ?? [createListItem()],
    };
}

export function createListItem({
    children,
}: Partial<Pick<ListItemNode, 'children'>> = {}): ListItemNode {
    return {
        type: LIST_ITEM_NODE_TYPE,
        children: children ?? [createListItemText()],
    };
}

export function createListItemText({
    children,
}: Partial<Pick<ListItemTextNode, 'children'>> = {}): ListItemTextNode {
    return {
        type: LIST_ITEM_TEXT_NODE_TYPE,
        children: children ?? [{ text: '' }],
    };
}
