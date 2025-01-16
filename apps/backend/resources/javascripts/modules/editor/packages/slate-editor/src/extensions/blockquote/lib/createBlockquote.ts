import type { QuoteNode } from '@prezly/slate-types';
import { QUOTE_NODE_TYPE } from '@prezly/slate-types';

export function createBlockquote(props: Pick<QuoteNode, 'align' | 'children'>): QuoteNode {
    const { align, children } = props;
    return {
        type: QUOTE_NODE_TYPE,
        children: children ?? [{ text: '' }],
        align,
    };
}
