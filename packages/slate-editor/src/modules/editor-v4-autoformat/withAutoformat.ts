import type { BaseEditor } from 'slate';
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

    let lastInsert = '';

    editor.insertText = (text) => {
        insertText(text);

        if (text !== ' ') {
            lastInsert = text;
            return;
        }

        for (const rule of rules) {
            const { mode = 'text', query } = rule;

            if (query && !query(editor, { ...rule, text })) continue;

            if (editor.selection) {
                const formatter = autoformatters[mode];

                const formatResult = formatter?.(editor, {
                    ...(rule as any),
                    text: lastInsert,
                });

                if (formatResult) {
                    return;
                }
            }
        }
    };

    return editor;
};
