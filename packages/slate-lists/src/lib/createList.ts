import type { ListNode } from '@prezly/slate-types';

export function createList(type: string, children: ListNode['children'] = []): ListNode {
    return {
        children,
        type: type as ListNode['type'],
    };
}
