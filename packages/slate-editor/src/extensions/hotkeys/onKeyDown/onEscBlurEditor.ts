import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { Editor } from 'slate';
import { ReactEditor } from 'slate-react';

export function onEscBlurEditor(editor: Editor, event: KeyboardEvent) {
    if (isHotkey('esc', event.nativeEvent)) {
        event.preventDefault();
        ReactEditor.blur(editor);
        return true;
    }
    return false;
}
