import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { Editor } from 'slate';
import { ReactEditor } from 'slate-react';

export function onEscBlurEditor(editor: Editor, event: KeyboardEvent) {
    // Since we're overriding the default Tab key behavior
    // we need to bring back the possibility to blur the editor
    // with keyboard.
    if (isHotkey('esc', event.nativeEvent)) {
        event.preventDefault();
        ReactEditor.blur(editor);
        return true;
    }
    return false;
}
