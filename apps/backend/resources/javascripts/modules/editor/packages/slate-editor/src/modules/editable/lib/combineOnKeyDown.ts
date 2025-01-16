import type { Extension, OnKeyDown } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate-common';
import type { KeyboardEvent } from 'react';

export function combineOnKeyDown(
    editor: SlateEditor,
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

        if (handled) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
}
