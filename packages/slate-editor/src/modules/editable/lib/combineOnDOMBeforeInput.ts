import type { OnDOMBeforeInput } from '@prezly/slate-commons';
import type { ReactEditor } from 'slate-react';

export function combineOnDOMBeforeInput(
    editor: ReactEditor,
    onDOMBeforeInputFns: OnDOMBeforeInput[],
) {
    return (event: Event) => {
        onDOMBeforeInputFns.forEach((onDOMBeforeInput) => {
            onDOMBeforeInput(event, editor);
        });
    };
}
