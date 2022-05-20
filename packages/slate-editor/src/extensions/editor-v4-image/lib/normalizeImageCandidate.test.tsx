/** @jsx jsx */

import { Editor } from 'slate';
import { withReact } from 'slate-react';

import { LoaderContentType } from '#extensions/editor-v4-loader';

import { jsx } from '../jsx';

import { isImageCandidateElement } from './isImageCandidateElement';
import { normalizeImageCandidate } from './normalizeImageCandidate';

const createEditor = (editor: JSX.Element): Editor => withReact(editor as unknown as Editor);

describe('normalizeImageCandidate', () => {
    const URL = 'https://example.com/image.jpg';

    it('should not move cursor when applying normalization', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-image-candidate href={URL} src={URL}>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-image-candidate>
            </editor>,
        );

        const expected = (
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-loader
                    contentType={LoaderContentType.IMAGE}
                    id="whatever"
                    message="Uploading Image"
                >
                    <h-text>
                        <cursor />
                    </h-text>
                </h-loader>
            </editor>
        ) as unknown as Editor;

        const nodes = Editor.nodes(editor, { at: [], match: isImageCandidateElement });

        Array.from(nodes).forEach((node) => {
            normalizeImageCandidate(editor, node);
        });

        expect(editor.selection).toEqual(expected.selection);
    });
});
