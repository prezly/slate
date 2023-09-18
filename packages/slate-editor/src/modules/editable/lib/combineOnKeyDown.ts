import type { OnKeyDown } from '@prezly/slate-commons';
import type { KeyboardEvent } from 'react';
import type { Editor } from 'slate';

export function combineOnKeyDown(editor: Editor, onKeyDownFns: OnKeyDown[]) {
    return (event: KeyboardEvent) => {
        for (const onKeyDown of onKeyDownFns) {
            const handled = onKeyDown(event, editor);
            if (handled) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    };
}
