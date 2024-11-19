import type { HierarchyNormalizer } from '../types';

export function removeWhenNoChildren(): HierarchyNormalizer {
    return (editor, node, path) => {
        // @ts-expect-error TODO: Fix this
        if ('children' in node && node.children.length === 0) {
            editor.removeNodes({ at: path, match: (n) => n === node });
            return true;
        }

        return false;
    };
}
