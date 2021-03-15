import { Editor, Path, Range } from 'slate';

import isLinkElement from './isLinkElement';

const getCurrentHref = (editor: Editor, selection: Path | Range): string | null => {
    const [currentNode] = Editor.node(editor, selection);
    return isLinkElement(currentNode) ? currentNode.href : null;
};

export default getCurrentHref;
