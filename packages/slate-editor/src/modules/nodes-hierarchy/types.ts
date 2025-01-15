import type { Node, NodeEntry, Path, SlateEditor } from '@udecode/plate';

export type HierarchyNodeQuery = (node: Node, path: Path, editor: SlateEditor) => boolean;
export type HierarchyNormalizer = (editor: SlateEditor, node: Node, path: Path) => boolean;
export type HierarchyFixer = (editor: SlateEditor, entry: NodeEntry) => boolean;

export const EDITOR_NODE_TYPE = Symbol('EDITOR');
export const TEXT_NODE_TYPE = Symbol('TEXT');

export type NodesHierarchySchema = {
    [EDITOR_NODE_TYPE]: HierarchyNormalizer[];
    [TEXT_NODE_TYPE]: HierarchyNormalizer[];
} & Record<string, HierarchyNormalizer[]>;
