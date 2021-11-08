import { Node } from 'slate';

/**
 * Stringify Slate node for debug purposes (e.g. error messages).
 *
 * Node structure will be dumped as JSON-like output, with "text" and
 * "children" properties collapsed to `...` to keep the message clean.
 */
export function stringifyNode(node: Node): string {
    const parts = Object.entries(node).map(([key, value]) => {
        if (key === 'text' && typeof value === 'string' && value.length > 3) {
            return `${JSON.stringify(key)}: "..."`;
        }
        if (key === 'children' && Array.isArray(value) && value.length > 0) {
            return `${JSON.stringify(key)}: [...]`;
        }
        return `${JSON.stringify(key)}: ${JSON.stringify(value)}`;
    });

    return `{${parts.join(', ')}}`;
}
