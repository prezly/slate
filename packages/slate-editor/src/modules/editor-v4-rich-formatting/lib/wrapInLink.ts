import { Editor, Path, Range, Transforms } from 'slate';

import createLink from './createLink';

const wrapInLink = (editor: Editor, at: Path | Range, href: string): void => {
    Transforms.wrapNodes(editor, createLink(href), { at, split: true });
};

export default wrapInLink;
