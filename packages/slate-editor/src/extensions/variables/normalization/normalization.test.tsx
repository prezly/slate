/** @jsx hyperscript */

import type { NodeEntry } from 'slate';
import { Editor } from 'slate';

import { hyperscript } from '../hyperscript';

import {
    convertLegacyPlaceholderNodesToVariables,
    removeUnknownVariables,
    removeUnknownVariableNodeAttributes,
} from './';

const normalizations = [
    convertLegacyPlaceholderNodesToVariables,
    removeUnknownVariables(['contact.firstname', 'contact.lastname']),
    removeUnknownVariableNodeAttributes,
];

function normalizeNode(editor: Editor, entry: NodeEntry) {
    for (const normalization of normalizations) {
        if (normalization(editor, entry)) {
            return true;
        }
    }
    return false;
}

describe('VariablesExtension', () => {
    describe('convertLegacyPlaceholderNodesToVariables', () => {
        it('should convert legacy `placeholder` nodes to `variable` nodes', () => {
            const editor = (
                <editor>
                    <h:paragraph>
                        <h:text>Hello, </h:text>
                        <h:placeholder key="contact.firstname">
                            <h:text>%contact.firstname%</h:text>
                        </h:placeholder>
                        <h:placeholder key="contact.lastname">
                            <h:text>%contact.lastname%</h:text>
                        </h:placeholder>
                        <h:placeholder key="contact.birthday">
                            <h:text>%contact.birthday%</h:text>
                        </h:placeholder>
                        <h:text>!</h:text>
                    </h:paragraph>
                </editor>
            ) as unknown as Editor;

            const expected = (
                <editor>
                    <h:paragraph>
                        <h:text>Hello, </h:text>
                        <h:variable key="contact.firstname">
                            <h:text>%contact.firstname%</h:text>
                        </h:variable>
                        <h:variable key="contact.lastname">
                            <h:text>%contact.lastname%</h:text>
                        </h:variable>
                        <h:text>%contact.birthday%</h:text>
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

    describe('removeUnknownVariables', () => {
        it('should remove unsupported variables nodes', () => {
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
                        <h:variable key="contact.birthday">
                            <h:text>%contact.birthday%</h:text>
                        </h:variable>
                        <h:text>!</h:text>
                    </h:paragraph>
                </editor>
            ) as unknown as Editor;

            const expected = (
                <editor>
                    <h:paragraph>
                        <h:text>Hello, </h:text>
                        <h:variable key="contact.firstname">
                            <h:text>%contact.firstname%</h:text>
                        </h:variable>
                        <h:variable key="contact.lastname">
                            <h:text>%contact.lastname%</h:text>
                        </h:variable>
                        <h:text>%contact.birthday%</h:text>
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

    describe('removeUnknownVariableNodeAttributes', () => {
        it('should remove unsupported variable node attributes', () => {
            const editor = (
                <editor>
                    <h:paragraph>
                        <h:text>Hello, </h:text>
                        <h:variable key="contact.firstname" bold={true} style="green">
                            <h:text>%contact.firstname%</h:text>
                        </h:variable>
                        <h:text>!</h:text>
                    </h:paragraph>
                </editor>
            ) as unknown as Editor;

            const expected = (
                <editor>
                    <h:paragraph>
                        <h:text>Hello, </h:text>
                        <h:variable key="contact.firstname">
                            <h:text>%contact.firstname%</h:text>
                        </h:variable>
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
