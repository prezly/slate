import { Events } from '@prezly/events';
import { createRef } from 'react';
import type { Editor } from 'slate';

import { noop } from '#lodash';

import type { EditorEventMap } from '#modules/editor-v4-events';
import { withEvents } from '#modules/editor-v4-events';
import {
    campaignPlaceholders,
    salutationPlaceholder,
    storyPlaceholders,
} from '#modules/placeholders';
import { coverage, createDelayedResolve, oembedInfo } from '#modules/tests';

import { createEditorV4 } from './createEditorV4';
import { getEnabledExtensions } from './getEnabledExtensions';

const containerRef = createRef<HTMLElement>();

const events = new Events<EditorEventMap>();

export function getAllExtensions() {
    return Array.from(
        getEnabledExtensions({
            availableWidth: 1000,
            containerRef,
            onFloatingAddMenuToggle: noop,
            withAttachments: {
                styled: true,
            },
            withCoverage: {
                dateFormat: 'YYYY/MM/DD',
                fetchCoverage: createDelayedResolve(coverage),
                renderSearch: () => null,
            },
            withEmbeds: {
                fetchOembed: createDelayedResolve(oembedInfo),
                showAsScreenshot: false,
            },
            withImages: {
                captions: true,
                showLayoutControls: true,
            },
            withPlaceholders: {
                placeholders: [
                    ...campaignPlaceholders,
                    salutationPlaceholder,
                    ...storyPlaceholders,
                ],
            },
            withPressContacts: {
                newsroomSettingsUrl: '',
                renderSearch: () => null,
            },
            withRichFormatting: {
                blocks: true,
                links: true,
                menu: true,
            },
            withUserMentions: {
                users: [
                    {
                        avatar_url: 'http://example.com/a.jpg',
                        id: 1,
                        name: 'John Doe',
                    },
                    {
                        avatar_url: 'http://example.com/b.jpg',
                        id: 2,
                        name: 'Jane Doe',
                    },
                ],
            },
        }),
    );
}

export function createEditor(input: JSX.Element) {
    return createEditorV4(input as unknown as Editor, getAllExtensions, [withEvents(events)]);
}
