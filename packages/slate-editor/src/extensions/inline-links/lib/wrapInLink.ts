import type { LinkNode } from '@prezly/slate-types';
import type { Editor, Path, Range } from 'slate';
import { Transforms } from 'slate';

import { createLink } from './createLink';

export function wrapInLink(
    editor: Editor,
    props: Pick<LinkNode, 'href' | 'new_tab'>,
    selection?: Path | Range,
): void {
    return Transforms.wrapNodes(editor, createLink({ ...props, children: [] }), {
        at: selection,
        split: true,
    });
}
