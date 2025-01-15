import type { ContactNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function updatePressContact(
    editor: SlateEditor,
    contact: ContactNode,
    patch: Partial<Pick<ContactNode, 'contact' | 'layout' | 'show_avatar'>>,
) {
    editor.tf.setNodes<ContactNode>(patch, {
        at: [],
        match: (node) => node === contact,
    });
}
