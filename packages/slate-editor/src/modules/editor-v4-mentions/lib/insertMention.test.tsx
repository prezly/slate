/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../jsx';
import { createExampleMentionElement, createMentionsEditor, Example } from '../test-utils';

import insertMention from './insertMention';

describe('insertMention', () => {
    const example: Example = {
        id: '1',
        information: 'lorem ipsum',
    };

    it('Inserts a mention after the cursor at the end of paragraph', () => {
        const editor = createMentionsEditor(
            ((
                <editor>
                    <h-p>
                        <h-text>lorem ipsum</h-text>
                        <cursor />
                    </h-p>
                </editor>
            ) as unknown) as Editor,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <h-example-mention example={example}>
                        <h-text />
                    </h-example-mention>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertMention(editor, createExampleMentionElement(example));

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a mention after the cursor in the middle of a paragraph', () => {
        const editor = createMentionsEditor(
            ((
                <editor>
                    <h-p>
                        <h-text>lorem ipsum</h-text>
                        <cursor />
                        <h-text>dolor sit amet</h-text>
                    </h-p>
                </editor>
            ) as unknown) as Editor,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <h-example-mention example={example}>
                        <h-text />
                    </h-example-mention>
                    <h-text>
                        <cursor />
                        dolor sit amet
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertMention(editor, createExampleMentionElement(example));

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
