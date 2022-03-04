import type { LinkNode } from '@prezly/slate-types';
import { LINK_NODE_TYPE } from '@prezly/slate-types';

export function createLink(props: Pick<LinkNode, 'href' | 'new_tab' | 'children'>): LinkNode {
    const { href, new_tab, children } = props;
    return {
        type: LINK_NODE_TYPE,
        href,
        new_tab,
        children,
    };
}
