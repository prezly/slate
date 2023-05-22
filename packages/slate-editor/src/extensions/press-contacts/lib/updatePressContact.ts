import type { ContactNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function updatePressContact(
    editor: Editor,
    contact: ContactNode,
    patch: Partial<Pick<ContactNode, 'contact' | 'layout' | 'show_avatar'>>,
) {
    Transforms.setNodes<ContactNode>(editor, patch, {
        at: [],
        match: (node) => node === contact,
    });
}
