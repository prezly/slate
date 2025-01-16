import type { ElementNode } from '@prezly/slate-types';
import { isElementNode } from '@prezly/slate-types';
import { type Location, type SlateEditor } from '@udecode/plate';

export function isBlockActive(
    editor: SlateEditor,
    type: ElementNode['type'],
    at?: Location,
): boolean {
    const [match] = Array.from(
        editor.api.nodes({
            match: (node) => isElementNode(node, type),
            at,
        }),
    );
    return Boolean(match);
}
