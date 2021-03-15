import { PressContact } from 'types';

const isPressContact = (contact: any): contact is PressContact =>
    (typeof contact.avatar_url === 'string' || contact.avatar_url === null) &&
    (typeof contact.company === 'string' || contact.company === null) &&
    (typeof contact.description === 'string' || contact.description === null) &&
    (typeof contact.email === 'string' || contact.email === null) &&
    (typeof contact.facebook === 'string' || contact.facebook === null) &&
    typeof contact.id === 'number' &&
    (typeof contact.mobile === 'string' || contact.mobile === null) &&
    typeof contact.name === 'string' &&
    (typeof contact.phone === 'string' || contact.phone === null) &&
    (typeof contact.twitter === 'string' || contact.twitter === null) &&
    (typeof contact.website === 'string' || contact.website === null);

export default isPressContact;
