import { useCallback, useRef } from 'react';
import type { Range } from 'slate';
import { Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

type RememberFn = () => void;
type RestoreFn = () => void;

export function useEditorSelectionMemory(): [RememberFn, RestoreFn] {
    const editor = useSlate();
    const lastSelectionRef = useRef<Range | null>();

    const remember = useCallback(
        function () {
            lastSelectionRef.current = editor.selection;
        },
        [lastSelectionRef],
    );

    const restore = useCallback(
        function () {
            if (!ReactEditor.isFocused(editor)) {
                // Restore editor focus because the input captured the focus.
                ReactEditor.focus(editor);
                if (lastSelectionRef.current) {
                    Transforms.select(editor, lastSelectionRef.current);
                    lastSelectionRef.current = null;
                }
            }
        },
        [editor, lastSelectionRef],
    );

    return [remember, restore];
}
