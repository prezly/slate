import type { AlignableNode, Alignment} from '@prezly/slate-types';
import { isAlignableElement } from '@prezly/slate-types';
import { Editor } from 'slate';

export function getAlignments(editor: Editor, defaultAlignment: Alignment): Alignment[] {
    const nodes = Editor.nodes<AlignableNode>(editor, {
        match: isAlignableElement,
    });

    const alignments = new Set<Alignment>();

    for (const [node] of nodes) {
        alignments.add(node.align ?? defaultAlignment);
    }

    return [...alignments];
}
