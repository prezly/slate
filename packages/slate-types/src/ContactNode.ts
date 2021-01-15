import { PressContact } from './sdk';

export default interface ContactNode {
    contact: PressContact;
    type: 'contact';
    uuid: string;
}
