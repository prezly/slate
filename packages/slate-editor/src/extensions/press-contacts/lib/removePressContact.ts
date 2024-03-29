import { EditorCommands } from '@prezly/slate-commons';
import type { ContactNode } from '@prezly/slate-types';
import { isContactNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removePressContact(editor: Editor): ContactNode | null {
    return EditorCommands.removeNode<ContactNode>(editor, {
        match: isContactNode,
    });
}
