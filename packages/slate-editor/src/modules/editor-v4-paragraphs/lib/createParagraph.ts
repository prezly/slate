import type { ParagraphNode } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

export function createParagraph(children: ParagraphNode['children'] = [{ text: '' }]): ParagraphNode {
    return {
        type: PARAGRAPH_NODE_TYPE,
        children,
    };
}
