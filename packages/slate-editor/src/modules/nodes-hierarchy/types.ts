import type { Editor, Path, NodeEntry } from 'slate';

export type HierarchyNormalizer = (editor: Editor, path: Path) => boolean;
export type HierarchyFixer = (editor: Editor, entry: NodeEntry) => boolean;

export const EditorRootNode = Symbol('EditorRootNode');

export type NodesHierarchySchema = { [EditorRootNode]: HierarchyNormalizer[] } & Record<
    string,
    HierarchyNormalizer[]
>;
