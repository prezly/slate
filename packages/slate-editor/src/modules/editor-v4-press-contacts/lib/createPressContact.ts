import { ContactNode, CONTACT_NODE_TYPE, PressContact } from '@prezly/slate-types';

const createPressContact = (contact: PressContact & { uuid: string }): ContactNode => ({
    children: [{ text: '' }],
    contact,
    type: CONTACT_NODE_TYPE,
    uuid: contact.uuid,
});

export default createPressContact;
