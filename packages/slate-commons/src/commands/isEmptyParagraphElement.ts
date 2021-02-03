import { Editor, Node } from 'slate';

import isNodeEmpty from './isNodeEmpty';
import isParagraphElement from './isParagraphElement';

const isEmptyParagraphElement = (editor: Editor, node?: Node | null): boolean => {
    if (!isParagraphElement(node)) {
        return false;
    }

    return isNodeEmpty(editor, node);
};

export default isEmptyParagraphElement;
