/** @jsx jsx */

import { uniq } from '@technically/lodash';
import type { NodeEntry } from 'slate';
import { Editor } from 'slate';

import { jsx } from '../jsx';
import { PlaceholderNode } from '../PlaceholderNode';

import { fixDuplicatePlaceholderUuid } from './fixDuplicatePlaceholderUuid';
import { removeDisabledPlaceholders } from './removeDisabledPlaceholders';

const normalizations = [
    fixDuplicatePlaceholderUuid,
    removeDisabledPlaceholders({
        withAttachmentPlaceholders: Boolean('ENABLED'),
        withContactPlaceholders: false,
        withCoveragePlaceholders: false,
        withEmbedPlaceholders: false,
        withGalleryPlaceholders: Boolean('ENABLED'),
        withImagePlaceholders: Boolean('ENABLED'),
        withInlineContactPlaceholders: false,
        withSocialPostPlaceholders: false,
        withVideoPlaceholders: false,
        withWebBookmarkPlaceholders: false,
    }),
];

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

    describe('removeDisabledPlaceholders', () => {
        it('should remove placeholder types not explicitly enabled', () => {
            const editor = (
                <editor>
                    <h:paragraph>
                        <h:text>Hello,</h:text>
                        <h:attachment-placeholder uuid="ad36d21e-41fb-4103-a369-1209551ab01f">
                            <h:text></h:text>
                        </h:attachment-placeholder>
                        <h:embed-placeholder uuid="aa57f283-f328-4ed1-898c-422529c50fe3">
                            <h:text></h:text>
                        </h:embed-placeholder>
                        <h:gallery-placeholder uuid="b1987ec8-44f5-4309-a095-131e3b5877b5">
                            <h:text></h:text>
                        </h:gallery-placeholder>
                        <h:image-placeholder uuid="f4d5be80-c73c-4487-8cbe-a2c195415c4f">
                            <h:text></h:text>
                        </h:image-placeholder>
                        <h:social-post-placeholder uuid="fe56baf5-0b32-4301-aa9c-52980b0f61f0">
                            <h:text></h:text>
                        </h:social-post-placeholder>
                        <h:video-placeholder uuid="564e84cd-fff3-4292-9102-959aeab7acbf">
                            <h:text></h:text>
                        </h:video-placeholder>
                        <h:web-bookmark-placeholder uuid="50d381dd-b552-4ece-9758-f8948ee2a737">
                            <h:text></h:text>
                        </h:web-bookmark-placeholder>
                        <h:text>!</h:text>
                    </h:paragraph>
                </editor>
            ) as unknown as Editor;

            const expected = (
                <editor>
                    <h:paragraph>
                        <h:text>Hello,</h:text>
                        <h:attachment-placeholder uuid="ad36d21e-41fb-4103-a369-1209551ab01f">
                            <h:text></h:text>
                        </h:attachment-placeholder>
                        <h:gallery-placeholder uuid="b1987ec8-44f5-4309-a095-131e3b5877b5">
                            <h:text></h:text>
                        </h:gallery-placeholder>
                        <h:image-placeholder uuid="f4d5be80-c73c-4487-8cbe-a2c195415c4f">
                            <h:text></h:text>
                        </h:image-placeholder>
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
