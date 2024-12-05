import { focusEditor, isEditorFocused, useEditorRef } from '@udecode/plate-common/react';
import { useCallback, useRef } from 'react';
import type { Range } from 'slate';

type RememberFn = () => void;
type RestoreFn = () => void;

export function useEditorSelectionMemory(): [RememberFn, RestoreFn] {
    const editor = useEditorRef();
    const lastSelectionRef = useRef<Range | null>();

    const remember = useCallback(
        function () {
            lastSelectionRef.current = editor.selection;
        },
        [lastSelectionRef],
    );

    const restore = useCallback(
        function () {
            if (!isEditorFocused(editor)) {
                // Restore editor focus because the input captured the focus.
                focusEditor(editor);
                if (lastSelectionRef.current) {
                    editor.select(lastSelectionRef.current);
                    lastSelectionRef.current = null;
                }
            }
        },
        [editor, lastSelectionRef],
    );

    return [remember, restore];
}
