export default interface PlaceholderNode {
    key:
        | 'contact.firstname'
        | 'contact.fullname'
        | 'contact.lastname'
        | 'contact.salutation'
        | 'publication.date'
        | 'release.shorturl'
        | 'release.url';
    type: 'placeholder';
}
