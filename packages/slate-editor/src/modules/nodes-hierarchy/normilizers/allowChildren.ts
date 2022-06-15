import type { Editor, Path } from 'slate';
import { Node } from 'slate';

import type { HierarchyFixer, HierarchyNormalizer } from '../types';

export function allowChildren(
    isAllowed: (node: Node, path: Path, editor: Editor) => boolean,
    fix: HierarchyFixer,
): HierarchyNormalizer {
    return (editor, [, path]) => {
        const unwantedChildEntry = Array.from(Node.children(editor, path)).find(
            ([node, path]) => !isAllowed(node, path, editor),
        );

        if (!unwantedChildEntry) {
            return false;
        }

        const [unwantedChild, unwantedChildPath] = unwantedChildEntry;

        return fix(editor, unwantedChild, unwantedChildPath);
    };
}
