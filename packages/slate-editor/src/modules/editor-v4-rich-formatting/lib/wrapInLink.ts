import type { Editor, Path, Range } from 'slate';
import { Transforms } from 'slate';

import createLink from './createLink';

const wrapInLink = (editor: Editor, at: Path | Range, href: string): void => {
    Transforms.wrapNodes(editor, createLink(href), { at, split: true });
};

export default wrapInLink;
