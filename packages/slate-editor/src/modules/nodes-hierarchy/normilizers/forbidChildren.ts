import type { Path } from 'slate';
import type { Editor } from 'slate';
import { Node } from 'slate';

import type { HierarchyFixer, HierarchyNormalizer } from '../types';

export function forbidChildren(
    isForbidden: (node: Node, path: Path, editor: Editor) => boolean,
    fix: HierarchyFixer,
): HierarchyNormalizer {
    return (editor, [, path]) => {
        for (const child of Node.children(editor, path)) {
            const [node, path] = child;

            if (isForbidden(node, path, editor)) {
                return fix(editor, node, path);
            }
        }

        return false;
    };
}
