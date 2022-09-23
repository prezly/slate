/** @jsx jsx */

import { uniq } from 'lodash-es';
import type { NodeEntry } from 'slate';
import { Editor } from 'slate';

import { jsx } from '../jsx';
import { PlaceholderNode } from '../PlaceholderNode';

import { fixDuplicatePlaceholderUuid } from './fixDuplicatePlaceholderUuid';

const normalizations = [fixDuplicatePlaceholderUuid];

function normalizeNode(editor: Editor, entry: NodeEntry) {
    for (const normalization of normalizations) {
        if (normalization(editor, entry)) {
            return true;
        }
    }
    return false;
}

describe('PlaceholdersExtension', () => {
    describe('fixDuplicatePlaceholderUuid', () => {
        function collectUniqPlaceholdersUuids(editor: Editor): PlaceholderNode['uuid'][] {
            const placeholders = Editor.nodes(editor, {
                at: [],
                match: (node): node is PlaceholderNode => PlaceholderNode.isPlaceholderNode(node),
            });

            return uniq(Array.from(placeholders).map(([node]) => node.uuid));
        }

        it('should automatically fix placeholder nodes with duplicate UUID', () => {
            const editor = (
                <editor>
                    <h:paragraph>
                        <h:text>Hello,</h:text>
                        <h:attachment-placeholder uuid="ad36d21e-41fb-4103-a369-1209551ab01f">
                            <h:text></h:text>
                        </h:attachment-placeholder>
                        <h:attachment-placeholder uuid="ad36d21e-41fb-4103-a369-1209551ab01f">
                            <h:text></h:text>
                        </h:attachment-placeholder>
                        <h:attachment-placeholder uuid="ad36d21e-41fb-4103-a369-1209551ab01f">
                            <h:text></h:text>
                        </h:attachment-placeholder>
                        <h:text>!</h:text>
                    </h:paragraph>
                </editor>
            ) as unknown as Editor;

            const prevChildren = editor.children;
            const prevUuids = collectUniqPlaceholdersUuids(editor);

            editor.normalizeNode = function (entry) {
                normalizeNode(editor, entry);
            };

            Editor.normalize(editor, { force: true });

            const currentChildren = editor.children;
            const currentUuids = collectUniqPlaceholdersUuids(editor);

            expect(currentChildren).not.toEqual(prevChildren);
            expect(currentUuids).not.toEqual(prevUuids);

            expect(prevUuids).toHaveLength(1);
            expect(currentUuids).toHaveLength(3);
        });
    });
});
