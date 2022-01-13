import type { AlignableNode, Alignment } from '@prezly/slate-types';
import { isAlignableElement } from '@prezly/slate-types';
import type { Editor, Node, Path } from 'slate';
import { Transforms } from 'slate';

export function toggleAlignment(editor: Editor, align: Alignment | undefined): void {
    if (align === undefined) {
        Transforms.unsetNodes(editor, 'align');
        return;
    }

    Transforms.setNodes<AlignableNode>(editor, { align }, { match: isTopLevelAlignableElement });
}

function isTopLevelAlignableElement(node: Node, path: Path): node is AlignableNode {
    return path.length === 1 && isAlignableElement(node);
}
