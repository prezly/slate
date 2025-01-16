import type { CalloutNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function updateCallout(
    editor: SlateEditor,
    callout: CalloutNode,
    patch: Partial<Pick<CalloutNode, 'icon' | 'align'>>,
) {
    editor.tf.setNodes<CalloutNode>(patch, {
        at: [],
        match: (node) => node === callout,
    });
}
