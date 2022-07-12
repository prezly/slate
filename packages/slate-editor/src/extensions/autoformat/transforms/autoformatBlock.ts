import {
    ELEMENT_DEFAULT,
    getRangeBefore,
    getRangeFromBlockStart,
    getText,
    setNodes,
    someNode,
} from '@udecode/plate-core';
import { castArray } from 'lodash-es';
import type { Range } from 'slate';
import { Editor, Transforms } from 'slate';
import { HistoryEditor } from 'slate-history';

import type { AutoformatBlockRule } from '../types';
import { getMatchRange } from '../utils/getMatchRange';

export interface AutoformatBlockOptions extends AutoformatBlockRule {
    text: string;
}

export function autoformatBlock(
    editor: Editor,
    {
        text,
        trigger,
        match: _match,
        type = ELEMENT_DEFAULT,
        allowSameTypeAbove = false,
        preFormat,
        format,
        triggerAtBlockStart = true,
    }: AutoformatBlockOptions,
) {
    const matches = castArray(_match as string | string[]);

    for (const match of matches) {
        const { end, triggers } = getMatchRange({
            match: { start: '', end: match },
            trigger,
        });

        if (!triggers.includes(text)) continue;

        let matchRange: Range | undefined;

        if (triggerAtBlockStart) {
            matchRange = getRangeFromBlockStart(editor) as Range;

            // Don't autoformat if there is void nodes.
            const hasVoidNode = someNode(editor, {
                at: matchRange,
                match: (n) => Editor.isVoid(editor, n),
            });
            if (hasVoidNode) continue;

            const textFromBlockStart = getText(editor, matchRange);

            if (end + ' ' !== textFromBlockStart) continue;
        } else {
            matchRange = getRangeBefore(editor, editor.selection as Range, {
                matchString: end,
            });
            if (!matchRange) continue;
        }

        if (!allowSameTypeAbove) {
            // Don't autoformat if already in a block of the same type.
            const isBelowSameBlockType = someNode(editor, { match: { type } });
            if (isBelowSameBlockType) continue;
        }

        HistoryEditor.withoutMerging(editor, () => {
            Transforms.delete(editor, { at: matchRange });
        });

        HistoryEditor.withoutSaving(editor, () => {
            preFormat?.(editor);
        });

        if (!format) {
            setNodes(
                editor,
                { type },
                {
                    match: (n) => Editor.isBlock(editor, n),
                },
            );
        } else {
            format(editor);
        }

        return true;
    }

    return false;
}
