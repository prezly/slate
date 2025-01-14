import type { Extension, OnDOMBeforeInput } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate-common';

export function combineOnDOMBeforeInput(
    editor: SlateEditor,
    extensions: Extension[],
    onDOMBeforeInputList: OnDOMBeforeInput[],
) {
    return function (event: Event) {
        onDOMBeforeInputList.forEach((onDOMBeforeInput) => {
            onDOMBeforeInput(event, editor);
        });

        extensions.forEach(({ onDOMBeforeInput }) => {
            onDOMBeforeInput?.(event, editor);
        });
    };
}
