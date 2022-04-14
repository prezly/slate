import type { ParagraphNode } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

export function createParagraph(
    props: { children?: ParagraphNode['children'] } = {},
): ParagraphNode {
    const { children = [{ text: '' }] } = props;
    return {
        type: PARAGRAPH_NODE_TYPE,
        children,
    };
}
