import type { ContactNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function updateInlineContact(
    editor: SlateEditor,
    contact: ContactNode,
    patch: Pick<ContactNode, 'contact'>,
) {
    editor.tf.setNodes<ContactNode>(patch, {
        at: [],
        match: (node) => node === contact,
    });
}
