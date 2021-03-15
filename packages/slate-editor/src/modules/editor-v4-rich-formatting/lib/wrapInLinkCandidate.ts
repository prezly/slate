import { Editor, Path, Range, Transforms } from 'slate';

import createLinkCandidate from './createLinkCandidate';

const wrapInLinkCandidate = (editor: Editor, at: Path | Range, id: string): void => {
    Transforms.wrapNodes(editor, createLinkCandidate(id), { at, split: true });
};

export default wrapInLinkCandidate;
