import type { AlignableNode, Alignment } from '@prezly/slate-types';
import { isAlignableElement } from '@prezly/slate-types';
import type { Node, Path } from 'slate';
import { Editor, Transforms } from 'slate';

export function getAlignment(editor: Editor, defaultAlignment: Alignment): Alignment[] {
    const nodes = Editor.nodes<AlignableNode>(editor, {
        match: isTopLevelAlignableElement,
    });

    const alignments = new Set<Alignment>();

    for (const [node] of nodes) {
        alignments.add(node.align ?? defaultAlignment);
    }

    return [...alignments];
}

export function toggleAlignment(editor: Editor, align: Alignment | undefined): void {
    if (align === undefined) {
        Transforms.unsetNodes(editor, 'align', { match: isTopLevelAlignableElement });
        return;
    }

    Transforms.setNodes<AlignableNode>(editor, { align }, { match: isTopLevelAlignableElement });
}

function isTopLevelAlignableElement(node: Node, path: Path): node is AlignableNode {
    return path.length === 1 && isAlignableElement(node);
}
