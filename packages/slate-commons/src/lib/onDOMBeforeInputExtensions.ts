import { ReactEditor } from 'slate-react';

import { Extension, OnDOMBeforeInput } from '../types';

const onDOMBeforeInputExtensions =
    (editor: ReactEditor, extensions: Extension[], onDOMBeforeInputList: OnDOMBeforeInput[]) =>
    (event: Event) => {
        onDOMBeforeInputList.forEach((onDOMBeforeInput) => {
            onDOMBeforeInput(event, editor);
        });

        extensions.forEach(({ onDOMBeforeInput }) => {
            if (onDOMBeforeInput) {
                onDOMBeforeInput(event, editor);
            }
        });
    };

export default onDOMBeforeInputExtensions;
