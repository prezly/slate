import { EditorCommands } from '@prezly/slate-commons';
import { ContactNode, isContactNode } from '@prezly/slate-types';
import { Editor } from 'slate';

const removePressContact = (editor: Editor): ContactNode | null =>
    EditorCommands.removeNode<ContactNode>(editor, {
        match: isContactNode,
    });

export default removePressContact;
