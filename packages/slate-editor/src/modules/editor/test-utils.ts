import { Alignment } from '@prezly/slate-types';
import { noop } from '@technically/lodash';
import { withHistory, type SlateEditor } from '@udecode/plate';
import { withReact } from '@udecode/plate/react';

import { coverage, createDelayedResolve, oembedInfo } from '#modules/tests';

import { createEditor as createBaseEditor } from './createEditor';
import { getEnabledExtensions } from './getEnabledExtensions';

export function getAllExtensions() {
    const fetchOembed = createDelayedResolve(oembedInfo);
    return Array.from(
        getEnabledExtensions({
            align: Alignment.LEFT,
            availableWidth: 1000,
            onFloatingAddMenuToggle: noop,
            withAllowedBlocks: {
                check: () => true,
            },
            withAttachments: true,
            withBlockquotes: true,
            withButtonBlocks: true,
            withCallouts: true,
            withCoverage: {
                dateFormat: 'YYYY/MM/DD',
                fetchCoverage: createDelayedResolve(coverage),
                onCreateCoverage: createDelayedResolve({ coverage }),
                onEdit: () => {},
                renderPlaceholder: () => null,
                withLayoutOptions: true,
            },
            withCustomNormalization: false,
            withDivider: true,
            withEmbeds: {
                fetchOembed,
                allowHtmlInjection: true,
                allowScreenshots: false,
            },
            withFloatingAddMenu: true,
            withGalleries: {},
            withGalleryBookmarks: {
                renderPlaceholder: () => null,
            },
            withHeadings: true,
            withImages: {
                withCaptions: true,
                withLayoutOptions: true,
            },
            withInlineContacts: false, // conflicts with withPressContacts
            withInlineLinks: true,
            withLists: true,
            withPlaceholders: {},
            withPressContacts: {
                onEdit: () => {},
                renderPlaceholder: () => null,
            },
            withStoryBookmarks: {
                loadStory: () => Promise.reject(),
                generateEditUrl: (story) => `/stories/${story.id}/edit`,
                generatePreviewUrl: (story) => `/stories/${story.id}/preview`,
                renderPlaceholder: () => null,
            },
            withStoryEmbeds: {
                render: () => null,
                renderPlaceholder: () => null,
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
            withVideos: { fetchOembed },
            withWebBookmarks: { fetchOembed },
            withSnippets: {
                renderInput: () => null,
            },
        }),
    );
}

export function createEditor(input: JSX.Element) {
    return createBaseEditor({
        editor: input as unknown as SlateEditor,
        getExtensions: getAllExtensions,
        withOverrides: [withReact, withHistory],
    });
}
