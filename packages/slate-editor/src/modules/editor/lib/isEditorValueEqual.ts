import { isEqual } from 'lodash-es';
import type { Editor } from 'slate';

import type { Value } from '../types';

export function isEditorValueEqual(editor: Editor, a: Value, b: Value): boolean {
    return a === b || isEqual(editor.serialize(a), editor.serialize(b));
}
