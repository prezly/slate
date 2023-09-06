import type { LinkNode } from '@prezly/slate-types';
import { LINK_NODE_TYPE } from '@prezly/slate-types';

type RequiredProps = Pick<LinkNode, 'href'>;
type OptionalProps = Pick<LinkNode, 'new_tab' | 'children'>;

export function createLink(props: RequiredProps & Partial<OptionalProps>): LinkNode {
    const { href, new_tab = false, children = [{ text: href }] } = props;
    return {
        type: LINK_NODE_TYPE,
        href,
        new_tab,
        children,
    };
}
