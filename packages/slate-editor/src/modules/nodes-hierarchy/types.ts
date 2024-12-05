import type { SlateEditor, TNode, TNodeEntry } from '@udecode/plate-common';
import type { Path } from 'slate';

export type HierarchyNodeQuery = (node: TNode, path: Path, editor: SlateEditor) => boolean;
export type HierarchyNormalizer = (editor: SlateEditor, node: TNode, path: Path) => boolean;
export type HierarchyFixer = (editor: SlateEditor, entry: TNodeEntry) => boolean;

export const EDITOR_NODE_TYPE = Symbol('EDITOR');
export const TEXT_NODE_TYPE = Symbol('TEXT');

export type NodesHierarchySchema = {
    [EDITOR_NODE_TYPE]: HierarchyNormalizer[];
    [TEXT_NODE_TYPE]: HierarchyNormalizer[];
} & Record<string, HierarchyNormalizer[]>;
