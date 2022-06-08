import type { ElementNode } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

export type HierarchyNormalizer = (editor: Editor, [node, path]: NodeEntry<ElementNode>) => boolean;

export type NodesHierarchySchema = Record<string, HierarchyNormalizer[]>;
