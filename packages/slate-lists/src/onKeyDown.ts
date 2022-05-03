import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';

import {
    canDeleteBackward,
    decreaseDepth,
    getListItemsInRange,
    increaseDepth,
    isCursorInEmptyListItem,
    splitListItem,
} from './lib';
import type { ListsEditor } from './types';

export function onKeyDown(editor: ListsEditor & ReactEditor, event: KeyboardEvent) {
    const listItemsInSelection = getListItemsInRange(editor, editor.selection);

    // Since we're overriding the default Tab key behavior
    // we need to bring back the possibility to blur the editor
    // with keyboard.
    if (isHotkey('esc', event.nativeEvent)) {
        event.preventDefault();
        ReactEditor.blur(editor);
    }

    if (isHotkey('tab', event.nativeEvent)) {
        event.preventDefault();
        increaseDepth(editor);
    }

    if (isHotkey('shift+tab', event.nativeEvent)) {
        event.preventDefault();
        decreaseDepth(editor);
    }

    if (isHotkey('backspace', event.nativeEvent) && !canDeleteBackward(editor)) {
        event.preventDefault();
        decreaseDepth(editor);
    }

    if (isHotkey('enter', event.nativeEvent)) {
        if (isCursorInEmptyListItem(editor)) {
            event.preventDefault();
            decreaseDepth(editor);
        } else if (listItemsInSelection.length > 0) {
            event.preventDefault();
            splitListItem(editor);
        }
    }

    // Slate does not always trigger normalization when one would expect it to.
    // So we want to force it after we perform lists operations, as it fixes
    // many unexpected behaviors.
    // https://github.com/ianstormtaylor/slate/issues/3758
    Editor.normalize(editor, { force: true });
}
