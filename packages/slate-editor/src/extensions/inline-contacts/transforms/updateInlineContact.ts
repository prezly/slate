import type { ContactNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function updateInlineContact(
    editor: Editor,
    contact: ContactNode,
    patch: Partial<Pick<ContactNode, 'contact'>>,
) {
    Transforms.setNodes<ContactNode>(editor, patch, {
        at: [],
        match: (node) => node === contact,
    });
}
