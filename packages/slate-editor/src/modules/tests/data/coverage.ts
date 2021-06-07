import { Coverage } from '@prezly/sdk';

import oembedInfo from './oembedInfo';

const coverage = ({
    id: 111111,
    uuid: '8474b48f-9999-ffff-ffff-48e47a0f05aa',
    display_name: 'This is a coverage headline',
    is_deleted: false,
    headline: 'This is a coverage headline',
    user: {
        id: 6770,
        username: 'example@prezly.com',
        email: 'example@prezly.com',
        name: 'John Doe',
        display_name: 'John Doe',
        first_name: 'John',
        last_name: 'Doe',
        avatar_url:
            'https://avatars-cdn.prezly.com/user/6770/457cf08d553f4df292a00e565d766ca12c3bdfe2089443ffba915819ac5c2e97?v=1&c=8ce8d69a3d5e61969e20d14c60acc7bbc223e27192bdd0afe3f77b1d3b482015',
        use_case_answer: 'unknown',
        sign_in_flow: 'sso',
        created_at: '2021-02-15T08:45:51+00:00',
        is_terms_of_service_accepted: false,
        last_seen_at: '2021-02-16T09:02:30+00:00',
    },
    story: null,
    newsroom: null,
    author_contact: {
        id: 88888888,
        contact_type: 'person',
        is_person: true,
        is_deleted: false,
        salutation: '',
        company_name: 'ACME',
        first_name: 'Jane',
        last_name: 'Doe',
        gender: 'female',
        display_name: 'ACME',
        avatar_url:
            'https://avatars-cdn.prezly.com/user/6770/457cf08d553f4df292a00e565d766ca12c3bdfe2089443ffba915819ac5c2e97?v=1&c=8ce8d69a3d5e61969e20d14c60acc7bbc223e27192bdd0afe3f77b1d3b482015',
        avatar_image: {
            version: 1,
            uuid: 'ab06b8f6-9999-ffff-ffff-2139434704bc',
            filename: 'jane_250x300.png',
            mime_type: null,
            size: null,
            original_width: 250,
            original_height: 300,
            effects: [],
        },
        bio: '',
        languages: [
            {
                code: 'EN',
                locale: 'en_US',
                name: 'English',
                direction: 'ltr',
            },
        ],
        primary_email: 'jane.doe@prezly.com',
        emails: ['jane.doe@prezly.com'],
        phone_numbers: [],
        social: [],
        urls: ['http://www.example.com/'],
        function_name: 'Designer',
        periodicity: null,
        medium_types: [],
        address: {
            street: 'Soap street',
            number: '',
            box: '',
            zip: 'CF382ED',
            city: '',
            region: '',
            country: 'United Kingdom',
        },
        address_text: 'Soap streetn\nCF382ED, United Kingdom',
        engagement_rating: {
            stars: 5,
            last_diff: -0.0464,
        },
        rating: {
            stars: 5,
            tendency: -0.0464,
        },
        coverage_number: 12,
        last_coverage_at: '2021-02-03T11:00:00+00:00',
        organisations_number: 1,
        organisations: [
            {
                id: 99999999,
                display_name: 'ACME',
                links: {
                    view: 'https://rock.prezly.com/contact/view/99999999',
                },
            },
        ],
        employees_number: 0,
        tags: [],
        is_bounced: false,
        is_duplicated: false,
        is_unsubscribed: false,
        is_unsubscribed_from_all_communications: false,
        has_enrichments: false,
        unsubscribed_newsrooms: [],
        duplicate_contacts: [],
        created_at: '2019-12-01T13:48:26+00:00',
        modified_at: '2020-09-17T06:18:57+00:00',
        stats: {
            sent: 40,
            replied: 0,
            clicked: 1,
            clicked_rate: 2.5,
            opened: 38,
            opened_rate: 95,
        },
        meta: {
            is_unsubscribed: false,
            is_bounced: false,
            is_duplicated: false,
        },
        links: {
            api: 'https://api.prezly.com/v1/contacts/88888888',
            view: 'https://rock.prezly.com/contact/view/88888888',
            edit: 'https://rock.prezly.com/contacts/88888888/edit',
            convert: 'https://rock.prezly.com/contact/convert/88888888',
            organisations_api: 'https://api.prezly.com/v1/contacts/88888888/organisations',
            employees_api: 'https://api.prezly.com/v1/contacts/88888888/employees',
            enrichments_api: 'https://api.prezly.com/v1/contacts/88888888/enrichments',
            duplicates_api: 'https://api.prezly.com/v1/contacts/88888888/duplicates',
            data_privacy_requests_api:
                'https://api.prezly.com/v1/contacts/88888888/data_privacy_requests',
            export_personal_data_api:
                'https://api.prezly.com/v1/contacts/88888888/personal-data-exports',
        },
    },
    organisation_contact: {
        id: 99999999,
        contact_type: 'organisation',
        is_person: false,
        is_deleted: false,
        salutation: '',
        company_name: 'ACME',
        first_name: '',
        last_name: '',
        gender: 'unspecified',
        display_name: 'ACME',
        avatar_url:
            'https://avatars-cdn.prezly.com/user/6770/457cf08d553f4df292a00e565d766ca12c3bdfe2089443ffba915819ac5c2e97?v=1&c=8ce8d69a3d5e61969e20d14c60acc7bbc223e27192bdd0afe3f77b1d3b482015',
        avatar_image: {
            version: 1,
            uuid: 'ab06b8f6-9999-ffff-ffff-2139434704bc',
            filename: 'jane_250x300.png',
            mime_type: null,
            size: null,
            original_width: 250,
            original_height: 300,
            effects: [],
        },
        bio: '',
        languages: [],
        primary_email: null,
        emails: [],
        phone_numbers: [],
        social: [],
        urls: ['http://example.com/'],
        function_name: '',
        periodicity: null,
        medium_types: [],
        address: {
            street: '',
            number: '',
            box: '',
            zip: '',
            city: '',
            region: '',
            country: null,
        },
        address_text: '',
        engagement_rating: {
            stars: 2,
            last_diff: 0,
        },
        rating: {
            stars: 2,
            tendency: 0,
        },
        coverage_number: 9,
        last_coverage_at: '2021-02-03T11:00:00+00:00',
        organisations_number: 0,
        organisations: [],
        employees_number: 3,
        tags: [],
        is_bounced: false,
        is_duplicated: false,
        is_unsubscribed: false,
        is_unsubscribed_from_all_communications: false,
        has_enrichments: false,
        unsubscribed_newsrooms: [],
        duplicate_contacts: [],
        created_at: '2019-11-28T16:06:50+00:00',
        modified_at: '2020-01-16T08:46:56+00:00',
        stats: {
            sent: 0,
            replied: 0,
            clicked: 0,
            clicked_rate: 0,
            opened: 0,
            opened_rate: 0,
        },
        meta: {
            is_unsubscribed: false,
            is_bounced: false,
            is_duplicated: false,
        },
        links: {
            api: 'https://api.prezly.com/v1/contacts/99999999',
            view: 'https://rock.prezly.com/contact/view/99999999',
            edit: 'https://rock.prezly.com/contacts/99999999/edit',
            convert: 'https://rock.prezly.com/contact/convert/99999999',
            organisations_api: 'https://api.prezly.com/v1/contacts/99999999/organisations',
            employees_api: 'https://api.prezly.com/v1/contacts/99999999/employees',
            enrichments_api: 'https://api.prezly.com/v1/contacts/99999999/enrichments',
            duplicates_api: 'https://api.prezly.com/v1/contacts/99999999/duplicates',
            data_privacy_requests_api:
                'https://api.prezly.com/v1/contacts/99999999/data_privacy_requests',
            export_personal_data_api:
                'https://api.prezly.com/v1/contacts/99999999/personal-data-exports',
        },
    },
    url: 'https://exmaple.com',
    avatar_url:
        'https://avatars-cdn.prezly.com/user/6770/457cf08d553f4df292a00e565d766ca12c3bdfe2089443ffba915819ac5c2e97?v=1&c=8ce8d69a3d5e61969e20d14c60acc7bbc223e27192bdd0afe3f77b1d3b482015',
    view_url: 'https://rock.prezly.com/coverage?aside=coverage-111111',
    note_content_json:
        '{"type":"document","children":[{"type":"paragraph","children":[{"text":""}]}],"version":"0.50"}',
    note_content_html: '<p>&nbsp;</p>',
    note_content_text: '  \n',
    attachment: null,
    attachment_oembed: oembedInfo,
    published_at: '2021-02-03T11:00:00+00:00',
    created_at: '2021-02-04T18:15:05+00:00',
    updated_at: '2021-02-04T18:15:24+00:00',
    edited_at: '2021-02-04T18:15:24+00:00',
} as unknown) as Coverage;

export default coverage;
