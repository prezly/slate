import { Events } from '@prezly/events';
import { noop } from 'lodash-es';
import type { Editor } from 'slate';

import type { EditorEventMap } from '#modules/events';
import { withEvents } from '#modules/events';
import { coverage, createDelayedResolve, oembedInfo } from '#modules/tests';

import { createEditor as createBaseEditor } from './createEditor';
import { getEnabledExtensions } from './getEnabledExtensions';

const events = new Events<EditorEventMap>();

export function getAllExtensions() {
    return Array.from(
        getEnabledExtensions({
            availableWidth: 1000,
            onFloatingAddMenuToggle: noop,
            withAttachments: true,
            withAutoformat: true,
            withBlockquotes: true,
            withCoverage: {
                dateFormat: 'YYYY/MM/DD',
                fetchCoverage: createDelayedResolve(coverage),
                renderSearch: () => null,
            },
            withDivider: true,
            withEmbeds: {
                fetchOembed: createDelayedResolve(oembedInfo),
                showAsScreenshot: false,
            },
            withFloatingAddMenu: true,
            withGalleries: {},
            withHeadings: true,
            withImages: {
                captions: true,
                withLayoutOptions: true,
            },
            withInlineLinks: true,
            withLists: true,
            withPressContacts: {
                renderSearch: () => null,
            },
            withStoryBookmarks: {
                loadStory: () => Promise.reject(),
                renderInput: () => null,
            },
            withStoryEmbeds: {
                render: () => null,
                renderInput: () => null,
            },
            withTextStyling: true,
            withTables: true,
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
            withVariables: {
                variables: [
                    { key: 'contact.firstname', text: 'First name' },
                    { key: 'contact.lastname', text: 'Last name' },
                    { key: 'contact.fullname', text: 'Full name' },
                    { key: 'release.url', text: 'Link to story' },
                    { key: 'release.shorturl', text: 'Short link to story' },
                    { key: 'contact.salutation', text: 'Salutation' },
                    { key: 'publication.date', text: 'Publication date' },
                ],
            },
            withVideos: {
                fetchOembed: createDelayedResolve(oembedInfo),
            },
            withWebBookmarks: {
                fetchOembed: createDelayedResolve(oembedInfo),
            },
        }),
    );
}

export function createEditor(input: JSX.Element) {
    return createBaseEditor(input as unknown as Editor, getAllExtensions, [withEvents(events)]);
}
