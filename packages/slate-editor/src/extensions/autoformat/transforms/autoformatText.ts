import { castArray } from '@technically/lodash';
import { HistoryEditor, type SlateEditor } from '@udecode/plate-common';
import type { Point, Range } from 'slate';

import type { AutoformatTextRule } from '../types';
import { getMatchPoints } from '../utils/getMatchPoints';
import { getMatchRange } from '../utils/getMatchRange';

export interface AutoformatTextOptions extends AutoformatTextRule {
    text: string;
}

export function autoformatText(editor: SlateEditor, options: AutoformatTextOptions) {
    const selection = editor.selection as Range;
    const matches = castArray(options.match);

    for (const match of matches) {
        const polishedMatch = Array.isArray(options.format)
            ? match
            : {
                  start: '',
                  end: match,
              };

        const { start, end, triggers } = getMatchRange({
            match: polishedMatch,
            trigger: options.trigger,
        });

        if (!triggers.includes(options.text)) continue;

        const matched = getMatchPoints(editor, { start, end });

        if (!matched) continue;

        const { afterStartMatchPoint, beforeEndMatchPoint, beforeStartMatchPoint } = matched;

        if (end) {
            // @ts-expect-error TODO: Fix this
            HistoryEditor.withoutMerging(editor, () => {
                editor.delete({
                    at: {
                        anchor: beforeEndMatchPoint,
                        focus: {
                            offset: selection.anchor.offset,
                            path: selection.anchor.path,
                        },
                    },
                });
            });
        }

        if (typeof options.format === 'function') {
            options.format(editor, matched);
        } else {
            const formatEnd = Array.isArray(options.format) ? options.format[1] : options.format;
            editor.insertText(formatEnd + ' ');

            if (beforeStartMatchPoint) {
                const formatStart = Array.isArray(options.format)
                    ? options.format[0]
                    : options.format;

                editor.delete({
                    at: {
                        anchor: beforeStartMatchPoint as Point,
                        focus: afterStartMatchPoint as Point,
                    },
                });

                editor.insertText(formatStart + ' ', {
                    at: beforeStartMatchPoint,
                });
            }
        }

        return true;
    }

    return false;
}
