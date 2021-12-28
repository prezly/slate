import type { BaseEditor } from 'slate';
import { Editor, Node } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';
import type { AutoformatRule } from './types';
import { autoformatBlock, autoformatMark, autoformatText } from './transforms';

export const withAutoformat = <T extends BaseEditor & ReactEditor & HistoryEditor>(
    editor: T,
    rules: AutoformatRule[],
): T => {
    const { insertText } = editor;

    const autoformatters = {
        block: autoformatBlock,
        mark: autoformatMark,
        text: autoformatText,
    };

    (window as any).myEditor = editor;

    editor.insertText = (text) => {
        insertText(text);

        if (text !== ' ') {
            return;
        }

        for (const rule of rules) {
            const { mode = 'text', query } = rule;

            if (query && !query(editor, { ...rule, text })) continue;

            if (editor.selection) {
                const wordBeforeSpace = Editor.before(editor, editor.selection, {
                    unit: 'character',
                    distance: 1,
                });

                if (!wordBeforeSpace) {
                    return;
                }

                const [wordNode] = Editor.node(editor, wordBeforeSpace, {
                    depth: 1,
                    edge: 'end',
                });

                const str = Node.string(wordNode);

                const formatter = autoformatters[mode];

                const text = str.slice(-2, -1);

                const formatResult = formatter?.(editor, {
                    ...(rule as any),
                    text,
                });

                if (formatResult) {
                    return;
                }
            }
        }
    };

    return editor;
};
