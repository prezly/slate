import { type Range } from '@udecode/plate';
import { useEditorRef } from '@udecode/plate/react';
import { useCallback, useRef } from 'react';

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
            if (!editor.api.isFocused()) {
                // Restore editor focus because the input captured the focus.
                editor.tf.focus();
                if (lastSelectionRef.current) {
                    editor.tf.select(lastSelectionRef.current);
                    lastSelectionRef.current = null;
                }
            }
        },
        [editor, lastSelectionRef],
    );

    return [remember, restore];
}
