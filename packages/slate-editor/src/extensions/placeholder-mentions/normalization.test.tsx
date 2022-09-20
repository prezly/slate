/** @jsx jsx */

import type { NodeEntry } from 'slate';
import { Editor } from 'slate';

import { jsx } from './jsx';
import {
    convertVariableNodesToPlaceholders,
    normalizeRedundantPlaceholderMentionAttributes,
} from './lib';

const normalizations = [
    convertVariableNodesToPlaceholders,
    normalizeRedundantPlaceholderMentionAttributes,
];

function normalizeNode(editor: Editor, entry: NodeEntry) {
    for (const normalization of normalizations) {
        if (normalization(editor, entry)) {
            return true;
        }
    }
    return false;
}

describe('PlaceholderMentionsExtension', () => {
    describe('convertVariableNodesToPlaceholders', () => {
        it('should convert future `variable` nodes to `placeholder` nodes', () => {
            const editor = (
                <editor>
                    <h:paragraph>
                        <h:text>Hello, </h:text>
                        <h:variable key="contact.firstname">
                            <h:text>%contact.firstname%</h:text>
                        </h:variable>
                        <h:variable key="contact.lastname">
                            <h:text>%contact.lastname%</h:text>
                        </h:variable>
                        <h:text>!</h:text>
                    </h:paragraph>
                </editor>
            ) as unknown as Editor;

            const expected = (
                <editor>
                    <h:paragraph>
                        <h:text>Hello, </h:text>
                        <h:placeholder key="contact.firstname">
                            <h:text>%contact.firstname%</h:text>
                        </h:placeholder>
                        <h:placeholder key="contact.lastname">
                            <h:text>%contact.lastname%</h:text>
                        </h:placeholder>
                        <h:text>!</h:text>
                    </h:paragraph>
                </editor>
            ) as unknown as Editor;

            editor.normalizeNode = function (entry) {
                normalizeNode(editor, entry);
            };

            Editor.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });
    });

    describe('removeUnknownPlaceholderMentionAttributes', () => {
        it('should remove unsupported placeholder node attributes', () => {
            const editor = (
                <editor>
                    <h:paragraph>
                        <h:text>Hello, </h:text>
                        <h:placeholder key="contact.firstname" bold={true} style="green">
                            <h:text>%contact.firstname%</h:text>
                        </h:placeholder>
                        <h:text>!</h:text>
                    </h:paragraph>
                </editor>
            ) as unknown as Editor;

            const expected = (
                <editor>
                    <h:paragraph>
                        <h:text>Hello, </h:text>
                        <h:placeholder key="contact.firstname">
                            <h:text>%contact.firstname%</h:text>
                        </h:placeholder>
                        <h:text>!</h:text>
                    </h:paragraph>
                </editor>
            ) as unknown as Editor;

            editor.normalizeNode = function (entry) {
                normalizeNode(editor, entry);
            };

            Editor.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });
    });
});
