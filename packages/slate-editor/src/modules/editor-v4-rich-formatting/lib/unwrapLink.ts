import { Editor, Path, Range, Transforms } from 'slate';

import isLinkElement from './isLinkElement';

const unwrapLink = (editor: Editor, selection: Path | Range): void => {
    Transforms.unwrapNodes(editor, {
        at: selection,
        match: (node) => isLinkElement(node),
        split: true,
    });
};

export default unwrapLink;
