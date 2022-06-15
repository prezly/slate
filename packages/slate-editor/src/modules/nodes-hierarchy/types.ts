import type { Editor, ElementEntry, Path, Node } from 'slate';

export type HierarchyNormalizer = (editor: Editor, entry: ElementEntry) => boolean;
export type HierarchyFixer = (editor: Editor, node: Node, path: Path) => boolean;

export type NodesHierarchySchema = Record<string, HierarchyNormalizer[]>;
