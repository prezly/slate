import type { AlignableNode, Alignment } from '@prezly/slate-types';
import { isAlignableElement, isTableCellNode } from '@prezly/slate-types';
import { getAboveNode, type SlateEditor, type TNodeEntry } from '@udecode/plate-common';
import type { Node, Path } from 'slate';

export function getAlignment(editor: SlateEditor, defaultAlignment: Alignment): Alignment[] {
    const nodes = editor.nodes<AlignableNode>({
        match: (node, path) => isTopLevelAlignableElement(editor, node, path),
    });

    const alignments = new Set<Alignment>();

    for (const [node] of nodes) {
        alignments.add(node.align ?? defaultAlignment);
    }

    return [...alignments];
}

export function toggleAlignment(editor: SlateEditor, align: Alignment | undefined): void {
    if (align === undefined) {
        editor.unsetNodes('align', {
            match: (node, path) => isTopLevelAlignableElement(editor, node, path),
        });
        return;
    }

    editor.setNodes<AlignableNode>(
        { align },
        { match: (node, path) => isTopLevelAlignableElement(editor, node, path) },
    );
}

function isAlignmentRoot([node, path]: TNodeEntry): boolean {
    // We allow aligning elements either at top-level or inside table cells.
    return path.length === 0 || isTableCellNode(node);
}

function isTopLevelAlignableElement(
    editor: SlateEditor,
    node: Node,
    path: Path,
): node is AlignableNode {
    const parent = getAboveNode(editor, { at: path });
    return parent !== undefined && isAlignmentRoot(parent) && isAlignableElement(node);
}
