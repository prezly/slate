import { TablesEditor } from '@prezly/slate-tables';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import { type Element, Range } from 'slate';

const isClipboardCopy = isHotkey(['mod+c', 'ctrl+insert']);
const isClipboardCut = isHotkey(['mod+x', 'shift+delete']);

export function onClipboardHotkey(
    event: KeyboardEvent,
    editor: TablesEditor,
    createDefaultElement: () => Element,
) {
    const selection = editor.selection;

    if (!selection || Range.isExpanded(selection)) return;

    if (isClipboardCopy(event)) {
        const entry = TablesEditor.findParentTable(editor, selection);
        if (!entry) {
            return false;
        }
        const [, path] = entry;

        editor.select(path); // Select the table

        document.execCommand('copy');

        return true;
    }

    if (isClipboardCut(event)) {
        const entry = TablesEditor.findParentTable(editor, selection);
        if (!entry) {
            return false;
        }
        const [, path] = entry;

        editor.withoutNormalizing(() => {
            editor.select(path); // Select the table
            const ref = editor.pathRef(path);

            if (document.execCommand('cut')) {
                editor.insertNodes(createDefaultElement(), { at: path });
                if (ref.current) {
                    editor.removeNodes({ at: ref.current });
                }
                editor.select(path);
            }

            ref.unref();
        });

        return true;
    }

    return false;
}
