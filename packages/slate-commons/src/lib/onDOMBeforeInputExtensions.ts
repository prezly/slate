import type { ReactEditor } from 'slate-react';

import type { Extension, OnDOMBeforeInput } from '../types';

export function onDOMBeforeInputExtensions(
    editor: ReactEditor,
    extensions: Extension[],
    onDOMBeforeInputList: OnDOMBeforeInput[],
) {
    return function (event: Event) {
        onDOMBeforeInputList.forEach((onDOMBeforeInput) => {
            onDOMBeforeInput(event, editor);
        });

        extensions.forEach(({ onDOMBeforeInput }) => {
            if (onDOMBeforeInput) {
                onDOMBeforeInput(event, editor);
            }
        });
    };
}
