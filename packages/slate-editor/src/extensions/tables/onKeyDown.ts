import { TablesEditor } from '@prezly/slate-tables';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import { type Element, Editor, Range, Transforms } from 'slate';

const isClipboardCopy = isHotkey(['mod+c', 'ctrl+insert']);
const isClipboardCut = isHotkey(['mod+x', 'shift+delete']);

export function onClipboardHotkey(
    event: KeyboardEvent,
    editor: Editor & TablesEditor,
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

        Transforms.select(editor, path); // Select the table

        document.execCommand('copy');

        return true;
    }

    if (isClipboardCut(event)) {
        const entry = TablesEditor.findParentTable(editor, selection);
        if (!entry) {
            return false;
        }
        const [, path] = entry;

        Editor.withoutNormalizing(editor, () => {
            Transforms.select(editor, path); // Select the table
            const ref = Editor.pathRef(editor, path);

            if (document.execCommand('cut')) {
                Transforms.insertNodes(editor, createDefaultElement(), { at: path });
                if (ref.current) {
                    Transforms.removeNodes(editor, { at: ref.current });
                }
                Transforms.select(editor, path);
            }

            ref.unref();
        });

        return true;
    }
}
