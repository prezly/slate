import { EditorCommands } from '@prezly/slate-commons';
import type { ContactNode } from '@prezly/slate-types';
import { isContactNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function removePressContact(editor: SlateEditor): ContactNode | null {
    return EditorCommands.removeNode<ContactNode>(editor, {
        match: isContactNode,
    });
}
