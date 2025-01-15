import type { SlateEditor } from '@udecode/plate';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

import { ListsEditor } from '../ListsEditor';
import { increaseDepth } from '../transformations';

export function onTabIncreaseListDepth(editor: SlateEditor, event: KeyboardEvent) {
    const schema = ListsEditor.getListsSchema(editor);
    if (schema && isHotkey('tab', event.nativeEvent)) {
        event.preventDefault();
        return increaseDepth(editor, schema);
    }
    return false;
}
