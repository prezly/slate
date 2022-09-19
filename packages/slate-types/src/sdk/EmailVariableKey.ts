export type EmailVariableKey =
    | 'contact.firstname'
    | 'contact.lastname'
    | 'contact.fullname'
    // TODO: consider including 'contact.salutation' conditionally as it is a behind-a-flag feature
    | 'contact.salutation'
    | 'release.url'
    | 'release.shorturl';
