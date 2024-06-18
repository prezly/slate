import type { CalloutNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function updateCallout(
    editor: Editor,
    callout: CalloutNode,
    patch: Partial<Pick<CalloutNode, 'icon' | 'align'>>,
) {
    Transforms.setNodes<CalloutNode>(editor, patch, {
        at: [],
        match: (node) => node === callout,
    });
}
