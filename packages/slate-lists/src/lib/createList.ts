import type { ListNode } from '@prezly/slate-types';

function createList(type: string, children: ListNode['children'] = []): ListNode {
    return {
        children,
        type: type as ListNode['type'],
    };
}

export default createList;
