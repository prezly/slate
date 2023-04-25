import { EditorCommands } from '@prezly/slate-commons';
import type { TextNode } from '@prezly/slate-types';
import { Text } from 'slate';

import type { HierarchyNormalizer, HierarchyNodeQuery } from '../types';

export function disallowMark(
    mark: keyof Omit<TextNode, 'text'>,
    match: HierarchyNodeQuery,
): HierarchyNormalizer {
    return (editor, node, path) => {
        if (Text.isText(node)) {
            if (!node[mark]) {
                return false;
            }

            if (!match(node, path, editor)) {
                return false;
            }

            return EditorCommands.unsetMark(editor, [node, path], mark);
        }

        return false;
    };
}
