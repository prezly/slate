import type { Editor, Node } from 'slate';

export type IsPreservedBlock = (editor: Editor, node: Node) => boolean;
