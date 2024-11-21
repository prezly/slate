import { EditorCommands } from '@prezly/slate-commons';
import { castArray } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate-common';
import { withoutMergingHistory, withoutSavingHistory } from '@udecode/plate-common';
import {
    ELEMENT_DEFAULT,
    getRangeBefore,
    getRangeFromBlockStart,
    getText,
    someNode,
} from '@udecode/plate-core';
import type { Range } from 'slate';

import type { AutoformatBlockRule } from '../types';
import { getMatchRange } from '../utils/getMatchRange';

export interface AutoformatBlockOptions extends AutoformatBlockRule {
    text: string;
}

export function autoformatBlock(
    editor: SlateEditor,
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
    const matches = castArray(_match);

    for (const match of matches) {
        const { end, triggers } = getMatchRange({
            match: { start: '', end: match },
            trigger,
        });

        if (!triggers.includes(text)) continue;

        let matchRange: Range | undefined;

        if (triggerAtBlockStart) {
            // @ts-expect-error Temporary, until we migrate to Autoformat plugin from current Plate
            matchRange = getRangeFromBlockStart(editor);

            // Don't autoformat if there is void nodes.
            // @ts-expect-error Temporary, until we migrate to Autoformat plugin from current Plate
            const hasVoidNode = someNode(editor, {
                at: matchRange,
                match: (node) => EditorCommands.isVoid(editor, node),
            });
            if (hasVoidNode) continue;

            // @ts-expect-error Temporary, until we migrate to Autoformat plugin from current Plate
            const textFromBlockStart = getText(editor, matchRange);

            if (end + ' ' !== textFromBlockStart) continue;
        } else {
            // @ts-expect-error Temporary, until we migrate to Autoformat plugin from current Plate
            matchRange = getRangeBefore(editor, editor.selection, {
                matchString: end,
            });
            if (!matchRange) continue;
        }

        if (!allowSameTypeAbove) {
            // Don't autoformat if already in a block of the same type.
            // @ts-expect-error Temporary, until we migrate to Autoformat plugin from current Plate
            const isBelowSameBlockType = someNode(editor, { match: { type } });
            if (isBelowSameBlockType) continue;
        }

        withoutMergingHistory(editor, () => {
            editor.delete({ at: matchRange });
        });

        withoutSavingHistory(editor, () => {
            preFormat?.(editor);
        });

        if (!format) {
            editor.setNodes(
                { type },
                {
                    match: (node) => EditorCommands.isBlock(editor, node),
                },
            );
        } else {
            format(editor);
        }

        return true;
    }

    return false;
}
