import type { AlignableNode, Alignment} from '@prezly/slate-types';
import { isAlignableElement } from '@prezly/slate-types';
import type { Editor} from 'slate';
import { Transforms } from 'slate';

export function toggleAlignment(editor: Editor, align: Alignment | undefined): void {
    if (align === undefined) {
        Transforms.unsetNodes(editor, 'align', {
            match: isAlignableElement,
        });
        return;
    }

    Transforms.setNodes<AlignableNode>(editor, { align }, { match: isAlignableElement });
}
