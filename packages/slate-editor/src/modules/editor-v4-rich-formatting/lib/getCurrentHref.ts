import { isLinkNode } from '@prezly/slate-types';
import type { Path, Range } from 'slate';
import { Editor } from 'slate';

const getCurrentHref = (editor: Editor, selection: Path | Range): string | null => {
    const [currentNode] = Editor.node(editor, selection);
    return isLinkNode(currentNode) ? currentNode.href : null;
};

export default getCurrentHref;
