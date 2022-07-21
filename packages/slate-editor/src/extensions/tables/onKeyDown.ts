import { TablesEditor } from '@prezly/slate-tables';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import { Editor, Range, Transforms } from 'slate';

const isClipboardCopy = isHotkey(['mod+c', 'ctrl+insert']);
const isClipboardCut = isHotkey(['mod+x', 'shift+delete']);

export function onClipboardHotkey(event: KeyboardEvent<Element>, editor: Editor & TablesEditor) {
    const selection = editor.selection;

    if (!selection || Range.isExpanded(selection)) return;

    if (isClipboardCopy(event)) {
        const entry = TablesEditor.findParentTable(editor, selection);
        if (!entry) {
            return;
        }
        const [, path] = entry;

        Transforms.select(editor, path); // Select the table

        document.execCommand('copy');
    }

    if (isClipboardCut(event)) {
        const entry = TablesEditor.findParentTable(editor, selection);
        if (!entry) {
            return;
        }
        const [, path] = entry;

        Editor.withoutNormalizing(editor, () => {
            Transforms.select(editor, path); // Select the table
            const ref = Editor.pathRef(editor, path);

            if (document.execCommand('cut')) {
                Transforms.insertNodes(editor, editor.createContentNode(), { at: path }); // FIXME: editor.createContentNode()
                if (ref.current) {
                    Transforms.removeNodes(editor, { at: ref.current });
                }
                Transforms.select(editor, path);
            }

            ref.unref();
        });
    }
}
