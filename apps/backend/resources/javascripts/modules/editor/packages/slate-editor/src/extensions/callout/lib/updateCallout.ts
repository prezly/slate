import type { CalloutNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

export function updateCallout(
    editor: SlateEditor,
    callout: CalloutNode,
    patch: Partial<Pick<CalloutNode, 'icon' | 'align'>>,
) {
    editor.setNodes<CalloutNode>(patch, {
        at: [],
        match: (node) => node === callout,
    });
}
