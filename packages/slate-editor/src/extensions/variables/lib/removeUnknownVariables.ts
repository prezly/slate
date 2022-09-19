import type { Normalize } from '@prezly/slate-commons';
import { isVariableNode } from '@prezly/slate-types';
import { Transforms } from 'slate';

import type { Variable } from '../types';

export function removeUnknownVariables(variables: Variable[]): Normalize {
    return (editor, [node, path]) => {
        if (isVariableNode(node) && !variables.some((variable) => variable.key === node.key)) {
            Transforms.removeNodes(editor, { at: path });
            return true;
        }
        return false;
    };
}
