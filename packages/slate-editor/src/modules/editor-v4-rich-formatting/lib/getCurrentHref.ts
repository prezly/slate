import { isLinkNode } from '@prezly/slate-types';
import { Editor, Path, Range } from 'slate';

const getCurrentHref = (editor: Editor, selection: Path | Range): string | null => {
    const [currentNode] = Editor.node(editor, selection);
    return isLinkNode(currentNode) ? currentNode.href : null;
};

export default getCurrentHref;
