import { TablesEditor } from '@prezly/slate-tables';
import { type Element, RangeApi } from '@udecode/plate';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

const isClipboardCopy = isHotkey(['mod+c', 'ctrl+insert']);
const isClipboardCut = isHotkey(['mod+x', 'shift+delete']);

export function onClipboardHotkey(
    event: KeyboardEvent,
    editor: TablesEditor,
    createDefaultElement: () => Element,
) {
    const selection = editor.selection;

    if (!selection || RangeApi.isExpanded(selection)) return;

    if (isClipboardCopy(event)) {
        const entry = TablesEditor.findParentTable(editor, selection);
        if (!entry) {
            return false;
        }
        const [, path] = entry;

        editor.tf.select(path); // Select the table

        document.execCommand('copy');

        return true;
    }

    if (isClipboardCut(event)) {
        const entry = TablesEditor.findParentTable(editor, selection);
        if (!entry) {
            return false;
        }
        const [, path] = entry;

        editor.tf.withoutNormalizing(() => {
            editor.tf.select(path); // Select the table
            const ref = editor.api.pathRef(path);

            if (document.execCommand('cut')) {
                editor.tf.insertNodes(createDefaultElement(), { at: path });
                if (ref.current) {
                    editor.tf.removeNodes({ at: ref.current });
                }
                editor.tf.select(path);
            }

            ref.unref();
        });

        return true;
    }

    return false;
}
