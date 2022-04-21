import type { ParagraphNode } from '@prezly/slate-types';
import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';

type Props = Partial<Pick<ParagraphNode, 'children'>>;

export function createParagraph({ children }: Props = {}): ParagraphNode {
    return {
        type: PARAGRAPH_NODE_TYPE,
        children: children ?? [{ text: '' }],
    };
}
