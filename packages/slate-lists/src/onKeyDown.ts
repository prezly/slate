import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import { Editor } from 'slate';
import type { ReactEditor } from 'slate-react';

import { canDeleteBackward, getListItemsInRange, isCursorInEmptyListItem } from './lib';
import { decreaseDepth, increaseDepth, splitListItem } from './transformations';
import type { ListsEditor } from './types';

type CompatibleEditor = ListsEditor & ReactEditor;

export function onKeyDown(editor: CompatibleEditor, event: KeyboardEvent): boolean | void {
    try {
        return (
            onKeyDown.onTabIncreaseListDepth(editor, event) ||
            onKeyDown.onShiftTabDecreaseListDepth(editor, event) ||
            onKeyDown.onBackspaceDecreaseListDepth(editor, event) ||
            onKeyDown.onEnterEscapeFromEmptyList(editor, event) ||
            onKeyDown.onEnterSplitNonEmptyList(editor, event)
        );
    } finally {
        // Slate does not always trigger normalization when one would expect it to.
        // So we want to force it after we perform lists operations, as it fixes
        // many unexpected behaviors.
        // https://github.com/ianstormtaylor/slate/issues/3758
        Editor.normalize(editor, { force: true });
    }
}

export namespace onKeyDown {
    export function onTabIncreaseListDepth(editor: CompatibleEditor, event: KeyboardEvent) {
        if (isHotkey('tab', event.nativeEvent)) {
            event.preventDefault();
            return increaseDepth(editor);
        }
        return false;
    }

    export function onShiftTabDecreaseListDepth(editor: CompatibleEditor, event: KeyboardEvent) {
        if (isHotkey('shift+tab', event.nativeEvent)) {
            event.preventDefault();
            return decreaseDepth(editor);
        }
        return false;
    }

    export function onBackspaceDecreaseListDepth(editor: CompatibleEditor, event: KeyboardEvent) {
        if (isHotkey('backspace', event.nativeEvent) && !canDeleteBackward(editor)) {
            event.preventDefault();
            return decreaseDepth(editor);
        }
        return false;
    }

    export function onEnterEscapeFromEmptyList(editor: CompatibleEditor, event: KeyboardEvent) {
        if (isHotkey('enter', event.nativeEvent)) {
            if (isCursorInEmptyListItem(editor)) {
                event.preventDefault();
                return decreaseDepth(editor);
            }
        }
        return false;
    }

    export function onEnterSplitNonEmptyList(editor: CompatibleEditor, event: KeyboardEvent) {
        if (isHotkey('enter', event.nativeEvent)) {
            const listItemsInSelection = getListItemsInRange(editor, editor.selection);
            if (listItemsInSelection.length > 0) {
                event.preventDefault();
                return splitListItem(editor);
            }
        }
        return false;
    }
}
