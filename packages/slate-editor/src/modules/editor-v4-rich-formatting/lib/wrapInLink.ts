import type { Editor, Path, Range } from 'slate';
import { Transforms } from 'slate';

import { createLink } from './createLink';

export function wrapInLink(editor: Editor, at: Path | Range, href: string): void {
    return Transforms.wrapNodes(editor, createLink(href), { at, split: true });
}

