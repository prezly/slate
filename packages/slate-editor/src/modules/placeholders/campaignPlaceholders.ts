import type { Placeholder } from '#extensions/placeholder-mentions';

/**
 * Available placeholders for "computed values" in campaign-like editors (campaign and pitch editors
 * for now).
 */
export const campaignPlaceholders: Placeholder[] = [
    {
        key: 'contact.firstname',
        text: 'First name',
    },
    {
        key: 'contact.lastname',
        text: 'Last name',
    },
    {
        key: 'contact.fullname',
        text: 'Full name',
    },
    {
        key: 'release.url',
        text: 'Link to story',
    },
    {
        key: 'release.shorturl',
        text: 'Short link to story',
    },
];
