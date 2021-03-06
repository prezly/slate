import Events from '@prezly/events';
import { createRef } from 'react';
import { Editor } from 'slate';

import { EditorEventMap, withEvents } from '../../modules/editor-v4-events';
import {
    campaignPlaceholders,
    salutationPlaceholder,
    storyPlaceholders,
} from '../../modules/placeholders';
import { coverage, createDelayedResolve, oembedInfo } from '../../modules/tests';

import createEditorV4 from './createEditorV4';
import getEnabledExtensions from './getEnabledExtensions';

const containerRef = createRef<HTMLElement>();

const events = new Events<EditorEventMap>();

export const getAllExtensions = () =>
    Array.from(
        getEnabledExtensions({
            availableWidth: 1000,
            containerRef,
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

export const createEditor = (input: JSX.Element) =>
    createEditorV4((input as unknown) as Editor, getAllExtensions, [withEvents(events)]);
