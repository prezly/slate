import { EditorCommands } from '@prezly/slate-commons';
import isHotkey from 'is-hotkey';
import { KeyboardEvent } from 'react';
import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';

import lists from './lists';
import { MarkType, RichFormattingExtensionParameters } from './types';

const MARK_HOTKEYS: { hotkey: string; mark: MarkType }[] = [
    { hotkey: 'mod+b', mark: MarkType.BOLD },
    { hotkey: 'mod+i', mark: MarkType.ITALIC },
    { hotkey: 'mod+u', mark: MarkType.UNDERLINED },
];

const marksOnKeyDown = (event: KeyboardEvent, editor: Editor) => {
    MARK_HOTKEYS.forEach(({ hotkey, mark }) => {
        if (isHotkey(hotkey, event.nativeEvent)) {
            event.preventDefault();
            EditorCommands.toggleMark(editor, mark);
        }
    });
};

const listsOnKeyDown = (event: KeyboardEvent, editor: ReactEditor) => {
    const listItemsInSelection = lists.getListItemsInRange(editor, editor.selection);

    // Since we're overriding the default Tab key behavior
    // we need to bring back the possibility to blur the editor
    // with keyboard.
    if (isHotkey('esc', event.nativeEvent)) {
        event.preventDefault();
        ReactEditor.blur(editor);
    }

    if (isHotkey('tab', event.nativeEvent)) {
        event.preventDefault();
        lists.increaseDepth(editor);
    }

    if (isHotkey('shift+tab', event.nativeEvent)) {
        event.preventDefault();
        lists.decreaseDepth(editor);
    }

    if (isHotkey('backspace', event.nativeEvent) && !lists.canDeleteBackward(editor)) {
        event.preventDefault();
        lists.decreaseDepth(editor);
    }

    if (isHotkey('enter', event.nativeEvent)) {
        if (lists.isCursorInEmptyListItem(editor)) {
            event.preventDefault();
            lists.decreaseDepth(editor);
        } else if (listItemsInSelection.length > 0) {
            event.preventDefault();
            lists.splitListItem(editor);
        }
    }
};

const softBreakOnKeyDown = (event: KeyboardEvent, editor: Editor) => {
    if (isHotkey('shift+enter', event.nativeEvent) && !event.isDefaultPrevented()) {
        event.preventDefault();
        Editor.insertText(editor, '\n');
    }
};

const createOnKeyDown =
    (parameters: RichFormattingExtensionParameters) => (event: KeyboardEvent, editor: Editor) => {
        softBreakOnKeyDown(event, editor);
        marksOnKeyDown(event, editor);

        if (parameters.blocks) {
            listsOnKeyDown(event, editor);

            // Slate does not always trigger normalization when one would expect it to.
            // So we want to force it after we perform lists operations, as it fixes
            // many unexpected behaviors.
            // https://github.com/ianstormtaylor/slate/issues/3758
            Editor.normalize(editor, { force: true });
        }
    };

export default createOnKeyDown;
