import type { CultureRef, NewsroomRef, StoryRef } from '@prezly/sdk';
import { Culture, Newsroom, Story } from '@prezly/sdk';
import * as React from 'react';
import { createEditor as createSlateEditor } from 'slate';
import { type RenderElementProps, Slate } from 'slate-react';
import * as uuid from 'uuid';

import { SearchInput } from '#components';

import { PlaceholdersExtension } from '#extensions/placeholders';
import { createEditor } from '#modules/editor';

import type { Suggestion } from '../../../components/SearchInput/types';
import { PlaceholderNode } from '../PlaceholderNode';

import { StoryEmbedPlaceholderElement } from './StoryEmbedPlaceholderElement';

const extensions = [PlaceholdersExtension()];
const editor = createEditor(createSlateEditor(), () => extensions);

const placeholder: PlaceholderNode<PlaceholderNode.Type.STORY_EMBED> = {
    type: PlaceholderNode.Type.STORY_EMBED,
    uuid: 'e57a4e5c-7769-4cbd-a159-a68be9373d26',
    children: [{ text: '' }],
};

const attributes: RenderElementProps['attributes'] = {
    'data-slate-node': 'element',
    'data-slate-void': true,
    ref: () => null,
};

let lastStoryId = 0;
let lastNewsroomId = 0;

const EN: CultureRef = {
    name: 'English',
    code: 'en',
    locale: 'en',
    direction: Culture.TextDirection.LTR,
    native_name: 'English',
    language_code: 'EN',
};

const THUMBNAIL = [
    'https://img.dummy-image-generator.com/abstract/dummy-48x48-White.jpg',
    'https://img.dummy-image-generator.com/abstract/dummy-48x48-Circus.jpg',
    'https://img.dummy-image-generator.com/abstract/dummy-48x48-Mosque.jpg',
    'https://img.dummy-image-generator.com/abstract/dummy-48x48-FairyLights.jpg',
    'https://img.dummy-image-generator.com/abstract/dummy-48x48-Goemetry.jpg',
    'https://img.dummy-image-generator.com/abstract/dummy-48x48-Comb.jpg',
    'https://img.dummy-image-generator.com/abstract/dummy-48x48-Floral.jpg',
    'https://img.dummy-image-generator.com/abstract/dummy-48x48-Stripes.jpg',
    'https://img.dummy-image-generator.com/abstract/dummy-48x48-Map.jpg',
];

const NEWSROOM = [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Cinnamon' },
    { name: 'Durian' },
    { name: 'Elderberry' },
];

function newsroom(): NewsroomRef {
    const id = ++lastNewsroomId;
    return {
        uuid: uuid.v4(),
        /**
         * @deprecated Please use `uuid` instead.
         * @see uuid
         */
        id,
        display_name: NEWSROOM[id % NEWSROOM.length].name,
        thumbnail_url: THUMBNAIL[(id + 5) % THUMBNAIL.length],
        name: NEWSROOM[id % NEWSROOM.length].name,
        subdomain: NEWSROOM[id % NEWSROOM.length].name.toLowerCase(),
        status: Newsroom.Status.ACTIVE,
        is_active: true,
        is_archived: false,
        is_multilingual: true,
        is_indexable: true,
        timezone: 'Europe/Brussels',
        time_format: 'HH:mm',
        date_format: 'DD.MM.YYYY',
        is_offline: false,
        is_online: true,
        url: NEWSROOM[id % NEWSROOM.length].name.toLowerCase() + '.prezly.com',
        /**
         * @deprecated Do not rely on these.
         */
        links: {
            media_gallery_api: '',
            analytics_and_visibility_settings: '',
            categories_management: '',
            company_info_settings: '',
            contacts_management: '',
            domain_settings: '',
            edit: '',
            gallery_management: '',
            hub_settings: '',
            languages: '',
            look_and_feel_settings: '',
            manual_subscription_management: '',
            privacy_settings: '',
            widget_settings: '',
        },
    };
}

function story(props: Partial<StoryRef> & Pick<StoryRef, 'uuid' | 'title'>): StoryRef {
    const { uuid, title, ...rest } = props;
    const id = ++lastStoryId;
    return {
        uuid,
        title,
        /**
         * @deprecated Please use `uuid` as an identifier instead.
         * @see uuid
         */
        id: lastStoryId++,
        slug: title.toLowerCase(),
        status: Story.Status.PUBLISHED,
        lifecycle_status: Story.Status.PUBLISHED,
        publication_status: Story.PublicationStatus.PUBLISHED,
        visibility: Story.Visibility.PUBLIC,
        thumbnail_url: THUMBNAIL[id % THUMBNAIL.length],
        created_at: '2023-06-29T13:03:00Z',
        updated_at: '2023-06-29T13:03:00Z',
        published_at: '2023-06-29T13:03:00Z',
        scheduled_at: null,
        culture: EN,
        author: null,
        newsroom: newsroom(),
        oembed: {
            type: 'link',
            version: '1.0',
            url: '',
        },
        links: {
            edit: '',
            newsroom_view: '',
            report: '',
        },

        ...rest,
    } as StoryRef;
}

function suggestion(
    props: Partial<StoryRef> & Pick<StoryRef, 'uuid' | 'title'>,
): Suggestion<StoryRef> {
    return { id: props.uuid, value: story(props) };
}

const suggestions: Suggestion<StoryRef>[] = [
    suggestion({
        uuid: '00000000-00000000-00000000-00000001',
        title: 'The "Made with Prezly" badge',
    }),
    suggestion({
        uuid: '00000000-00000000-00000000-00000002',
        title: 'The new side navigation layout',
    }),
    suggestion({
        uuid: '00000000-00000000-00000000-00000003',
        title: 'Story headers, titles and subtitles are now one with the editor',
    }),
    suggestion({
        uuid: '00000000-00000000-00000000-00000004',
        title: 'Introducing: Improved Campaign click reporting',
    }),
    suggestion({
        uuid: '00000000-00000000-00000000-00000005',
        title: 'Improvement: Site contacts and email signatures',
    }),
    suggestion({
        uuid: '00000000-00000000-00000000-00000006',
        title: 'Prezly themes got an upgrade',
    }),
    suggestion({
        uuid: '00000000-00000000-00000000-00000007',
        title: 'Recent improvements & fixes',
    }),
    suggestion({
        uuid: '00000000-00000000-00000000-00000008',
        title: 'Introducing the revamped Contact preview',
    }),
    suggestion({
        uuid: '00000000-00000000-00000000-00000009',
        title: 'In beta: The Site activity dashboard',
    }),
    suggestion({
        uuid: '00000000-00000000-00000000-00000010',
        title: 'Revamping billing: A new Plans page & a self-upgrade option',
    }),
];

async function getSuggestions(query: string) {
    await delay(500 + Math.random() * 500);
    return suggestions.filter(({ value }) =>
        value.title.toLowerCase().includes(query.toLowerCase()),
    );
}

export default {
    title: 'Extensions/Placeholders/elements',
    decorators: [
        (Story: React.ComponentType) => (
            <Slate editor={editor} initialValue={[placeholder]}>
                <div style={{ width: 680, height: 400 }}>
                    <Story />
                </div>
            </Slate>
        ),
    ],
};

export function StoryEmbedPlaceholder() {
    return (
        <StoryEmbedPlaceholderElement
            attributes={attributes}
            element={placeholder}
            getSuggestions={getSuggestions}
            renderSuggestion={({ ref, active, disabled, suggestion, onSelect }) => (
                <SearchInput.Option
                    active={active}
                    disabled={disabled}
                    onClick={onSelect}
                    forwardRef={ref}
                >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img
                            src={suggestion.value.thumbnail_url}
                            style={{
                                width: 40,
                                height: 40,
                                textAlign: 'center',
                                color: 'white',
                                lineHeight: '40px',
                                borderRadius: 6,
                                backgroundColor: '#2FA4F9',
                                marginRight: 16,
                                flexGrow: 0,
                            }}
                        />
                        <div style={{ flexGrow: 1, fontWeight: 600, fontSize: 14 }}>
                            {suggestion.value.title}
                        </div>
                    </div>
                </SearchInput.Option>
            )}
            renderSuggestionsFooter={() => (
                <div>
                    <a href="#">+ Create a new story</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href="#">Manage stories</a>
                </div>
            )}
            removable
        >
            {''}
        </StoryEmbedPlaceholderElement>
    );
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
