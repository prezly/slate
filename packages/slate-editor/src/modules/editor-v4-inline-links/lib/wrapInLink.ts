import type { LinkNode } from '@prezly/slate-types';
import type { Editor, Path, Range } from 'slate';
import { Transforms } from 'slate';

import { createLink } from './createLink';

export function wrapInLink(
    editor: Editor,
    at: Path | Range,
    props: Pick<LinkNode, 'href' | 'new_tab'>,
): void {
    return Transforms.wrapNodes(editor, createLink({ ...props, children: [] }), { at, split: true });
}
