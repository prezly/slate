import type { Normalize } from '@prezly/slate-commons';
import { isVariableNode } from '@prezly/slate-types';
import { Transforms } from 'slate';

export function removeUnknownVariables(variables: string[]): Normalize {
    return (editor, [node, path]) => {
        if (isVariableNode(node) && !variables.includes(node.key)) {
            Transforms.unwrapNodes(editor, {
                at: path,
                match: (matched) => matched === node,
            });
            return true;
        }
        return false;
    };
}
