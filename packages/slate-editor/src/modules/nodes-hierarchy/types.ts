import type { ElementNode } from '@prezly/slate-types';
import type { Editor, NodeEntry, Path, Node } from 'slate';

export type HierarchyNormalizer = (editor: Editor, [node, path]: NodeEntry<ElementNode>) => boolean;
export type HierarchyFixer = (editor: Editor, node: Node, path: Path) => boolean;

export type NodesHierarchySchema = Record<string, HierarchyNormalizer[]>;
