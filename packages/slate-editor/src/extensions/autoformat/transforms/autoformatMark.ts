import { castArray } from '@technically/lodash';
import {
    getEditorString,
    HistoryEditor,
    removeMark,
    type SlateEditor,
} from '@udecode/plate-common';
import type { Point, Range } from 'slate';

import type { AutoformatMarkRule } from '../types';
import { getMatchPoints } from '../utils/getMatchPoints';
import { getMatchRange } from '../utils/getMatchRange';

export interface AutoformatMarkOptions extends AutoformatMarkRule {
    text: string;
}

export function autoformatMark(
    editor: SlateEditor,
    { type, text, trigger, match: _match, ignoreTrim }: AutoformatMarkOptions,
) {
    if (!type) return false;

    const selection = editor.selection as Range;
    const matches = castArray(_match);

    for (const match of matches) {
        const { start, end, triggers } = getMatchRange({
            match,
            trigger,
        });

        if (!triggers.includes(text)) continue;

        const matched = getMatchPoints(editor, { start, end });
        if (!matched) continue;

        const { afterStartMatchPoint, beforeEndMatchPoint, beforeStartMatchPoint } = matched;

        const matchRange = {
            anchor: afterStartMatchPoint,
            focus: beforeEndMatchPoint,
        } as Range;

        if (!ignoreTrim) {
            const matchText = getEditorString(editor, matchRange);
            if (matchText.trim() !== matchText) continue;
        }

        // delete end match
        if (end) {
            // @ts-expect-error TODO: Fix this
            HistoryEditor.withoutMerging(editor, () => {
                editor.delete({
                    at: {
                        anchor: beforeEndMatchPoint,
                        focus: {
                            offset: selection.anchor.offset - 1,
                            path: selection.anchor.path,
                        },
                    },
                });
            });
        }

        const marks = castArray(type);

        // add mark to the text between the matches
        editor.select(matchRange as Range);

        marks.forEach((mark) => {
            editor.addMark(mark, true);
        });

        editor.collapse({ edge: 'end' });
        removeMark(editor, { key: marks, shouldChange: false });

        editor.delete({
            at: {
                anchor: beforeStartMatchPoint as Point,
                focus: afterStartMatchPoint as Point,
            },
        });

        editor.move({ distance: 1 });

        return true;
    }

    return false;
}
