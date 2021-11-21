import type { ElementNode } from '@prezly/slate-types';
import { isElementNode } from '@prezly/slate-types';
import type { Location } from 'slate';
import { Editor } from 'slate';

const isBlockActive = (editor: Editor, type: ElementNode['type'], at?: Location): boolean => {
    const [match] = Array.from(
        Editor.nodes(editor, {
            match: (node) => isElementNode(node, type),
            at,
        }),
    );
    return Boolean(match);
};

export default isBlockActive;
