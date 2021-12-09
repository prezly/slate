/** @jsx jsx */

import type { Editor } from 'slate';
import { Range } from 'slate';

import jsx from '../jsx';

import getWordAfterTrigger from './getWordAfterTrigger';

describe('getWordAfterTrigger', () => {
    it('Returns word after trigger and range of the matched trigger + word', () => {
        const trigger = '@';
        const wordAfterTrigger = 'mention';

        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        This is some text and here is a{trigger}
                        {wordAfterTrigger}
                        <cursor />
                        And here are some random words after the mention.
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expectedRange = (
            <editor>
                <h-p>
                    <h-text>
                        This is some text and here is a
                        <anchor />
                        {trigger}
                        {wordAfterTrigger}
                        <focus />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const at = Range.start(editor.selection!);
        const result = getWordAfterTrigger(editor, { at, trigger });

        expect(result).toEqual({
            text: wordAfterTrigger,
            range: expectedRange.selection,
        });
    });

    it('Returns null when there is no trigger', () => {
        const trigger = '@';

        const editor = (
            <editor>
                <h-p>
                    <h-text>This is some text</h-text>
                    <cursor />
                </h-p>
            </editor>
        ) as unknown as Editor;

        const at = Range.start(editor.selection!);
        const result = getWordAfterTrigger(editor, { at, trigger });

        expect(result).toBeNull();
    });

    it('Returns a match when there is no word after the trigger', () => {
        const trigger = '@';
        const wordAfterTrigger = '';

        const expectedRange = (
            <editor>
                <h-p>
                    <h-text>
                        This is some text and here is a
                        <anchor />
                        {trigger}
                        {wordAfterTrigger}
                        <focus />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        This is some text and here is a{trigger}
                        {wordAfterTrigger}
                        <cursor />
                        And here are some random words after the mention.
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const at = Range.start(editor.selection!);
        const result = getWordAfterTrigger(editor, { at, trigger });

        expect(result).toEqual({
            text: wordAfterTrigger,
            range: expectedRange.selection,
        });
    });

    it('Returns a match when at the start of an empty editor and there is no word after the trigger', () => {
        const trigger = '@';

        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        {trigger}
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expectedRange = (
            <editor>
                <h-p>
                    <h-text>
                        <anchor />
                        {trigger}
                        <focus />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const at = Range.start(editor.selection!);
        const result = getWordAfterTrigger(editor, { at, trigger });

        expect(result).toEqual({
            text: '',
            range: expectedRange.selection,
        });
    });

    it('Matches the text after the trigger, up to the cursor', () => {
        const trigger = '@';

        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        Text before trigger
                        {trigger}aaaa
                        <cursor />
                        bbbb
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expectedRange = (
            <editor>
                <h-p>
                    <h-text>
                        Text before trigger
                        <anchor />
                        {trigger}aaaa
                        <focus />
                        bbbb
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const at = Range.start(editor.selection!);
        const result = getWordAfterTrigger(editor, { at, trigger });

        expect(result).toEqual({
            text: 'aaaa',
            range: expectedRange.selection,
        });
    });
});
