import type { ListNode } from '@prezly/slate-types';

const createList = (type: string, children: ListNode['children'] = []): ListNode => ({
    children,
    type: type as ListNode['type'],
});

export default createList;
