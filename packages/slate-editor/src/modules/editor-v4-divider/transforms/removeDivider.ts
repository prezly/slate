import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import { DIVIDER_TYPE } from '../constants';

export default function removeDivider(editor: Editor): void {
    EditorCommands.removeNode(editor, { match: (node) => node.type === DIVIDER_TYPE });
}
