import type { SlateEditor } from '@udecode/plate-common';
import type { Path } from 'slate';
import { v4 as uuidV4 } from 'uuid';

const DIRTY_PROPERTY_NAME = uuidV4();

/**
 * This function is seemingly a no-op, but it does mark node dirty in Slate internals.
 * It is useful when a normalization is applicable on a node multiple times.
 * Without it, Slate will not run subsequent normalization.
 */
export function makeDirty(editor: SlateEditor, at: Path): void {
    editor.setNodes({ [DIRTY_PROPERTY_NAME]: uuidV4() }, { at });
    editor.setNodes({ [DIRTY_PROPERTY_NAME]: undefined }, { at });
}
