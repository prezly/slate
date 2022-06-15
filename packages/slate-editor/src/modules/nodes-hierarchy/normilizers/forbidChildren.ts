import type { Path } from 'slate';
import { Editor } from 'slate';
import { Node, Element } from 'slate';

import type { HierarchyFixer, HierarchyNormalizer } from '../types';

export function forbidChildren(
    isForbidden: (node: Node, path: Path, editor: Editor) => boolean,
    fix: HierarchyFixer,
): HierarchyNormalizer {
    return (editor, [node, path]) => {
        if (!Element.isElement(node) && !Editor.isEditor(node)) {
            return false;
        }

        const forbiddenChildren = Array.from(Node.children(editor, path)).find(([node, path]) =>
            isForbidden(node, path, editor),
        );

        if (!forbiddenChildren) {
            return false;
        }

        const [unwantedChild, unwantedChildPath] = forbiddenChildren;

        return fix(editor, unwantedChild, unwantedChildPath);
    };
}
