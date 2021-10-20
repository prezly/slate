import { isLinkNode } from '@prezly/slate-types';
import { Editor, Path, Range, Transforms } from 'slate';

const unwrapLink = (editor: Editor, selection: Path | Range): void => {
    Transforms.unwrapNodes(editor, {
        at: selection,
        match: (node) => isLinkNode(node),
        split: true,
    });
};

export default unwrapLink;
