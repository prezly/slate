import { type Node, type Path } from '@udecode/plate';

export function isTopLevelNode(_node: Node, path: Path): boolean {
    return path.length === 1;
}
