import type { AlignableNode, Alignment } from '@prezly/slate-types';
import { isAlignableElement, isTableCellNode } from '@prezly/slate-types';
import type {Node, NodeEntry, Path} from 'slate';
import { Editor, Transforms } from 'slate';

export function getAlignment(editor: Editor, defaultAlignment: Alignment): Alignment[] {
    const nodes = Editor.nodes<AlignableNode>(editor, {
        match: (node, path) => isTopLevelAlignableElement(editor, node, path),
    });

    const alignments = new Set<Alignment>();

    for (const [node] of nodes) {
        alignments.add(node.align ?? defaultAlignment);
    }

    return [...alignments];
}

export function toggleAlignment(editor: Editor, align: Alignment | undefined): void {
    if (align === undefined) {
        Transforms.unsetNodes(editor, 'align', {
            match: (node, path) => isTopLevelAlignableElement(editor, node, path),
        });
        return;
    }

    Transforms.setNodes<AlignableNode>(
        editor,
        { align },
        { match: (node, path) => isTopLevelAlignableElement(editor, node, path) },
    );
}

function isAlignmentRoot([node, path]: NodeEntry): boolean {
    // We allow aligning elements either at top-level or inside table cells.
    return path.length === 0 || isTableCellNode(node);
}

function isTopLevelAlignableElement(editor: Editor, node: Node, path: Path): node is AlignableNode {
    const parent = Editor.above(editor, { at: path });
    return parent !== undefined && isAlignmentRoot(parent) && isAlignableElement(node);
}
