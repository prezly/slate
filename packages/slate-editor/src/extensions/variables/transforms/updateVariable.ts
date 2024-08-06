import type { VariableNode } from '@prezly/slate-types';
import { isVariableNode } from '@prezly/slate-types';
import { pick } from '@technically/lodash';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function updateVariable(
    editor: Editor,
    attrs: Partial<Pick<VariableNode, 'fallback' | 'key'>>,
) {
    const changes = pick(attrs, ['fallback', 'key']);

    Transforms.setNodes<VariableNode>(editor, changes, {
        match: isVariableNode,
    });
}
