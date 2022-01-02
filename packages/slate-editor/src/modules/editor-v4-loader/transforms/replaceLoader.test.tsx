/** @jsx jsx */

import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import { Editor } from 'slate';
import { withReact } from 'slate-react';

import { jsx } from '../jsx';
import { findLoaderPath, isLoaderElement } from '../lib';
import type { LoaderNode } from '../types';
import { LoaderContentType } from '../types';

import { replaceLoader } from './replaceLoader';

const createEditor = (editor: JSX.Element): Editor => withReact(editor as unknown as Editor);

const LOADER_ID = 'id-1';

describe('replaceLoader', () => {
    it('should replace loader with paragraph and remove all previous loader attributes', () => {
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
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-p>
                    <h-text>lorem</h-text>
                </h-p>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const loaderPath = findLoaderPath(editor, LOADER_ID);

        if (loaderPath) {
            const [[loader]] = Array.from(
                Editor.nodes<LoaderNode>(editor, {
                    at: loaderPath,
                    match: isLoaderElement,
                }),
            );

            if (loader) {
                replaceLoader(editor, loader, {
                    children: [{ text: 'lorem' }],
                    type: PARAGRAPH_NODE_TYPE,
                });
            }
        }

        expect(editor.children).toEqual(expected.children);
    });
});
