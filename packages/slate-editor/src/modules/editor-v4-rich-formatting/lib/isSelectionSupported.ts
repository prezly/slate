import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Element } from 'slate';

import isLinkElement from './isLinkElement';
import isRichTextElement from './isRichTextElement';

const isSelectionSupported = (editor: Editor): boolean => {
    if (EditorCommands.isSelectionEmpty(editor)) {
        return false;
    }

    const nodeEntries = Array.from(
        Editor.nodes<Element>(editor, {
            match: (node) => Element.isElement(node),
        }),
    );

    return nodeEntries.every(([node]) => isRichTextElement(node) || isLinkElement(node));
};

export default isSelectionSupported;
