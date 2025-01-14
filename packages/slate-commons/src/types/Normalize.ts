import type { SlateEditor } from '@udecode/plate-common';
import type { NodeEntry } from 'slate';

export type Normalize = (editor: SlateEditor, entry: NodeEntry) => boolean;
