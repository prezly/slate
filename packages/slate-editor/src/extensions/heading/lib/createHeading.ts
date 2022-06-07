import type { HeadingNode } from '@prezly/slate-types';
import { HEADING_1_NODE_TYPE } from '@prezly/slate-types';

export function createHeading(
    props: Partial<Pick<HeadingNode, 'type' | 'align' | 'children'>>,
): HeadingNode {
    const { align, children, type } = props;
    return {
        type: type ?? HEADING_1_NODE_TYPE,
        children: children ?? [{ text: '' }],
        align,
    };
}
