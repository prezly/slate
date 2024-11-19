import type { SlateEditor } from '@udecode/plate-common';
import type { Point, Range } from 'slate';

import { getText } from './getText';

function escapeRegExp(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&');
}

interface Result {
    range: Range;
    text: string;
}

function getStartOfTriggerLocation(editor: SlateEditor, at: Point, trigger: string): Point | null {
    /**
     * We need the part of `trigger.length` characters before because the `Editor.before` with
     * unit=word ignores punctuation, and the `trigger` will most likely be a punctuation character.
     *
     * List of punctuation characters:
     * https://github.com/ianstormtaylor/slate/blob/0bbe121d76c5c2313d939de8a7ebed3bfd37f62d/packages/slate/src/utils/string.ts#L6
     */
    const pointOfWordStart = editor.before(at, { unit: 'word' });
    const pointOfTrigger =
        pointOfWordStart &&
        editor.before(pointOfWordStart, { distance: trigger.length, unit: 'character' });

    // `pointOfWordStart` can still point to the previous node, even if `at` is already pointing to the
    // node after it. If that is the case, we simply stop looking for the trigger location.
    if (at.path[0] !== pointOfWordStart?.path[0]) {
        return null;
    }

    /**
     * `Editor.before` returns undefined if there is no destination location.
     * For example, when calling `Editor.before` when the cursor is at the start of the editor,
     * which means there is nothing before the cursor.
     *
     * So we can use start of the editor as the fallback point.
     */
    return pointOfTrigger || editor.start([]);
}

function getMatchingTextRange(
    editor: SlateEditor,
    { at, text, trigger }: { at: Point; text: string; trigger: string },
): Range {
    const distance = text.length + trigger.length;
    /**
     * `Editor.before` returns undefined if there is no destination location.
     * It should probably not happen in this case, because we're computing the distance based
     * on the matched text. But just in case, use start of the editor as the fallback point.
     */
    const triggerPoint =
        editor.before(at, { distance, unit: 'character' }) || editor.start([]);

    /**
     * Compute a new range to match the exact range of `trigger` + `text`.
     * We were using `textRange`, but that may match the [word before] + trigger,
     * and when used to use the range to insert a node, it will replace the [word before].
     *
     * Range start (anchor) is the point of trigger character, and end (focus)
     * is the end of the matched word.
     * For example: <anchor />@mention<focus />
     */
    return editor.range(triggerPoint, at);
}

export function getWordAfterTrigger(
    editor: SlateEditor,
    { at, trigger }: { at: Point; trigger: string },
): Result | null {
    /**
     * Range from `at` to start of the word, including the `trigger`. But because `Editor.before`
     * ignores punctuation, the matched range may be wider.
     *
     * Example 1:
     * 1. `editor` state: like a <textarea>! <cursor />
     * 2. `textRange` matches " <textarea>! "
     * 3. input `trigger` (.e.g. "@")
     * 4. `textRange` matches " <textarea>! @"
     *
     * Example 2:
     * 1. `editor` state: This is<cursor />
     * 2. `textRange` matches " is"
     * 3. input `trigger` (.e.g. "@")
     * 4. `textRange` matches " is@"
     *
     * Example 3:
     * 1. `editor` state: This is @person<cursor /> (in the process of typing a mention)
     * 2. `textRange` matches "@person"
     */
    const triggerStart = getStartOfTriggerLocation(editor, at, trigger);
    if (!triggerStart) {
        return null;
    }

    const textRange = editor.range(at, triggerStart);

    /**
     * The text might match something before `trigger`, so we should not
     * use the start of string (`^`) token in the RegExp.
     * We match `\w*` because we want the match as soon as there is a `trigger`,
     * even if the text is still empty.
     */
    const triggerAndWordRegex = new RegExp(`${escapeRegExp(trigger)}(\\w*)$`);
    const [, text] = getText(editor, textRange).match(triggerAndWordRegex) || [];

    if (typeof text !== 'string') {
        return null;
    }

    return {
        range: getMatchingTextRange(editor, { at, text, trigger }),
        text,
    };
}
