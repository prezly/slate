import type { Editor, Path } from 'slate';
import { Transforms } from 'slate';
import { v4 as uuidV4 } from 'uuid';

const DIRTY_PROPERTY_NAME = uuidV4();

/**
 * This function is seemingly a no-op, but it does mark node dirty in Slate internals.
 * It is useful when a normalization is applicable on a node multiple times.
 * Without it, Slate will not run subsequent normalization.
 */
function makeDirty(editor: Editor, at: Path): void {
    Transforms.setNodes(editor, { [DIRTY_PROPERTY_NAME]: uuidV4() }, { at });
    Transforms.setNodes(editor, { [DIRTY_PROPERTY_NAME]: undefined }, { at });
}

export default makeDirty;
