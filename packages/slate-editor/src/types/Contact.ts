import { UploadcareImageStoragePayload } from '@prezly/uploadcare';

import ContactDuplicateSuggestion from './ContactDuplicateSuggestion';
import ContactRef from './ContactRef';
import Language from './Language';

export enum ContactType {
    PERSON = 'person',
    ORGANISATION = 'organisation',
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    UNSPECIFIED = 'unspecified',
}

export enum Periodicity {
    DAILY = 'daily',
    WEEKDAYS = 'weekdays',
    WEEKLY = 'weekly',
    BI_WEEKLY = 'bi-weekly',
    MONTHLY = 'monthly',
    BI_MONTHLY = 'bi-monthly',
    QUARTERLY = 'quarterly',
    ANNUALLY = 'annually',
    BI_ANNUALLY = 'bi-annually',
    SEMI_ANNUALLY = 'semi-annually',
}

export enum MediumType {
    WIRE = 'wire',
    PRINT = 'print',
    RADIO = 'radio',
    PHOTO = 'photo',
    NEWSPAPER = 'newspaper',
    MAGAZINE = 'magazine',
    TV = 'tv',
    BLOG = 'blog',
    VLOG = 'vlog',
    SOCIAL = 'social',
    WEB = 'web',
    ANALYST = 'analyst',
    EXPERT = 'expert',
    INFLUENCER = 'influencer',
    PODCAST = 'podcast',
    NEWSLETTER = 'newsletter',
    NEWS_SITE = 'news website',
}

export enum SocialNetwork {
    DISCORD = 'discord',
    FACEBOOK = 'facebook',
    INSTAGRAM = 'instagram',
    LINKEDIN = 'linkedin',
    PINTEREST = 'pinterest',
    SKYPE = 'skype',
    SNAPCHAT = 'snapchat',
    TWITCH = 'twitch',
    TWITTER = 'twitter',
    YOUTUBE = 'youtube',
}

export enum PhoneNumberType {
    TELEPHONE = 'tel',
    CELLPHONE = 'cell',
}

export interface PhoneNumber {
    number: string;
    type: PhoneNumberType;
}

export default interface Contact {
    id: number;
    contact_type: ContactType;
    is_deleted: boolean;
    is_person: boolean;

    company_name: string;
    first_name: string;
    last_name: string;

    display_name: string;
    avatar_url: string;
    avatar_image: UploadcareImageStoragePayload | null;
    salutation: string;
    gender: Gender;
    periodicity: Periodicity | null;
    medium_types: MediumType[];
    bio: string;
    languages: Language[];

    primary_email: string | null;
    emails: string[];
    phone_numbers: PhoneNumber[];
    function_name: string;
    address: {
        street: string;
        zip: string;
        city: string;
        region: string;
        country: string | null;
    };
    address_text: string;
    urls: string[];

    engagement_rating: {
        last_diff: number;
        stars: number;
    };

    coverage_number: number;
    last_coverage_at: string | null;

    organisations_number: number;
    organisations: ContactRef[];

    employees_number: number;
    tags: string[];

    has_enrichments: boolean;
    is_bounced: boolean;
    is_duplicated: boolean;
    is_unsubscribed: boolean;
    is_unsubscribed_from_all_communications: boolean;
    unsubscribed_newsrooms: string[];
    duplicate_contacts: ContactDuplicateSuggestion[];

    created_at: string | null; // there are contacts in DB that do have `created_at = null`
    modified_at: string | null;

    stats: {
        clicked: number;
        clicked_rate: number;
        opened: number;
        opened_rate: number;
        replied: number;
        sent: number;
    };

    links: {
        api: string;
        convert: string;
        edit: string;
        employees_api: string;
        enrichments_api: string;
        export_personal_data_api: string;
        organisations_api: string;
        view: string;
    };

    social: { type: SocialNetwork; username: string }[];
}
