import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Element } from 'slate';

import { DIVIDER_TYPE } from '../constants';

export default function removeDivider(editor: Editor): void {
    EditorCommands.removeNode(editor, {
        match: (node) => Element.isElement(node) && node.type === DIVIDER_TYPE,
    });
}
