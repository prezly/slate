/** @jsx jsx */

import type { Editor } from 'slate';
import { withReact } from 'slate-react';

import { jsx } from '../jsx';
import { findLoaderPath } from '../lib';
import { LoaderContentType } from '../types';

import { removeLoader } from './removeLoader';

const createEditor = (editor: JSX.Element): Editor => withReact(editor as unknown as Editor);

const LOADER_ID = 'id-1';

describe('removeLoader', () => {
    it('should remove currently focused loader and focus the adjacent paragraph', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-loader
                    contentType={LoaderContentType.ATTACHMENT}
                    id={LOADER_ID}
                    message="Caption"
                >
                    <h-text>
                        <cursor />
                    </h-text>
                </h-loader>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                        paragraph after
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        removeLoader(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should do nothing when not focusing a loader node', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        paragraph before
                        <cursor />
                    </h-text>
                </h-p>
                <h-loader
                    contentType={LoaderContentType.ATTACHMENT}
                    id={LOADER_ID}
                    message="Caption"
                >
                    <h-text />
                </h-loader>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text>
                        paragraph before
                        <cursor />
                    </h-text>
                </h-p>
                <h-loader
                    contentType={LoaderContentType.ATTACHMENT}
                    id={LOADER_ID}
                    message="Caption"
                >
                    <h-text />
                </h-loader>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        removeLoader(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should remove a loader at a given location when the cursor is focusing something else', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        paragraph before
                        <cursor />
                    </h-text>
                </h-p>
                <h-loader
                    contentType={LoaderContentType.ATTACHMENT}
                    id={LOADER_ID}
                    message="Caption"
                >
                    <h-text />
                </h-loader>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text>
                        paragraph before
                        <cursor />
                    </h-text>
                </h-p>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const loaderPath = findLoaderPath(editor, LOADER_ID);
        if (!loaderPath) {
            throw new Error('Loader node was not found, but expected.');
        }

        removeLoader(editor, loaderPath);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
