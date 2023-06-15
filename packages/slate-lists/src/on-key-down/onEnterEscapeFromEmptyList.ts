import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { ReactEditor } from 'slate-react';

import { isCursorInEmptyListItem } from '../lib';
import { decreaseDepth } from '../transformations';
import type { ListsEditor } from '../types';

type Editor = ListsEditor & ReactEditor;

export function onEnterEscapeFromEmptyList(editor: Editor, event: KeyboardEvent) {
    if (isHotkey('enter', event.nativeEvent)) {
        if (isCursorInEmptyListItem(editor)) {
            event.preventDefault();
            return decreaseDepth(editor);
        }
    }
    return false;
}
