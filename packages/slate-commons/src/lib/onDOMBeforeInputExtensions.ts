import type { ReactEditor } from 'slate-react';

import type { Extension, OnDOMBeforeInput } from '../types';

function onDOMBeforeInputExtensions(
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

export default onDOMBeforeInputExtensions;
