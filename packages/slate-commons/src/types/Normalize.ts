import type { Editor, NodeEntry } from 'slate';

export type Normalize = (editor: Editor, entry: NodeEntry) => boolean;
