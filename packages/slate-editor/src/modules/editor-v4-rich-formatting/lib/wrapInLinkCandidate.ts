import type { Editor, Path, Range } from 'slate';
import { Transforms } from 'slate';

import createLinkCandidate from './createLinkCandidate';

const wrapInLinkCandidate = (editor: Editor, at: Path | Range, id: string): void => {
    Transforms.wrapNodes(editor, createLinkCandidate(id), { at, split: true });
};

export default wrapInLinkCandidate;
