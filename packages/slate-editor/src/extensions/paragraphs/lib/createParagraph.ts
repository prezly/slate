import type { ParagraphNode } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

type Props = Partial<Pick<ParagraphNode, 'children' | 'align'>>;

export function createParagraph({ children, align }: Props = {}): ParagraphNode {
    return {
        type: PARAGRAPH_NODE_TYPE,
        align,
        children: children ?? [{ text: '' }],
    };
}
