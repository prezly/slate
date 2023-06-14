import type { Extension, OnKeyDown } from '@prezly/slate-commons';
import type { KeyboardEvent } from 'react';
import type { Editor } from 'slate';

export function combineOnKeyDown(
    editor: Editor,
    extensions: Extension[],
    onKeyDownList: OnKeyDown[],
) {
    return function (event: KeyboardEvent) {
        let handled = false;
        onKeyDownList.forEach((onKeyDown) => {
            if (!handled) {
                const ret = onKeyDown(event, editor);
                handled = Boolean(ret);
            }
        });

        extensions.forEach(({ onKeyDown }) => {
            if (!handled) {
                const ret = onKeyDown?.(event, editor);
                handled = Boolean(ret);
            }
        });
    };
}
