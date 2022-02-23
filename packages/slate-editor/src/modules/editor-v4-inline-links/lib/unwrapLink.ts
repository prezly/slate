import { isLinkNode } from '@prezly/slate-types';
import type { Editor, Path, Range } from 'slate';
import { Transforms } from 'slate';

export function unwrapLink(editor: Editor, selection?: Path | Range): void {
    return Transforms.unwrapNodes(editor, {
        at: selection,
        match: isLinkNode,
        split: true,
    });
}
