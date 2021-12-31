import type { ContactNode, PressContact } from '@prezly/slate-types';
import { CONTACT_NODE_TYPE } from '@prezly/slate-types';

function createPressContact(contact: PressContact): ContactNode {
    return {
        children: [{ text: '' }],
        contact,
        type: CONTACT_NODE_TYPE,
        uuid: contact.uuid,
    };
}

export default createPressContact;
