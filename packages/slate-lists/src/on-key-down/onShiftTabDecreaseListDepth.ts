import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { ReactEditor } from 'slate-react';

import { decreaseDepth } from '../transformations';
import type { ListsEditor } from '../types';

type Editor = ListsEditor & ReactEditor;

export function onShiftTabDecreaseListDepth(editor: Editor, event: KeyboardEvent) {
    if (isHotkey('shift+tab', event.nativeEvent)) {
        event.preventDefault();
        return decreaseDepth(editor);
    }
    return false;
}
