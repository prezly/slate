import { EditorCommands } from '@prezly/slate-commons';
import type { TextNode } from '@prezly/slate-types';
import { TextApi } from '@udecode/plate';

import type { HierarchyNormalizer, HierarchyNodeQuery } from '../types';

export function disallowMark(
    mark: keyof Omit<TextNode, 'text'>,
    match: HierarchyNodeQuery,
): HierarchyNormalizer {
    return (editor, node, path) => {
        if (TextApi.isText(node)) {
            if (!node[mark]) {
                return false;
            }

            if (!match(node, path, editor)) {
                return false;
            }

            return EditorCommands.unsetMark(editor, [node, path], mark as string);
        }

        return false;
    };
}
