import { castArray } from 'lodash';
import type { Editor, Point, Range } from 'slate';
import { Transforms } from 'slate';
import { HistoryEditor } from 'slate-history';
import { getMatchPoints } from '../utils/getMatchPoints';
import { getMatchRange } from '../utils/getMatchRange';
import type { AutoformatTextRule } from '../types';

export interface AutoformatTextOptions extends AutoformatTextRule {
    text: string;
}

export const autoformatText = (editor: Editor, options: AutoformatTextOptions) => {
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
            HistoryEditor.withoutMerging(editor, () => {
                Transforms.delete(editor, {
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

                Transforms.delete(editor, {
                    at: {
                        anchor: beforeStartMatchPoint as Point,
                        focus: afterStartMatchPoint as Point,
                    },
                });

                Transforms.insertText(editor, formatStart + ' ', {
                    at: beforeStartMatchPoint,
                });
            }
        }

        return true;
    }

    return false;
};
