import type { Node, Path } from 'slate';

export function isTopLevelNode(_node: Node, path: Path): boolean {
    return path.length === 1;
}
