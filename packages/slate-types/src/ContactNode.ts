import ElementNode, { isElementNode } from './ElementNode';
import { isPressContact, PressContact } from './sdk';

export const CONTACT_NODE_TYPE = 'contact';

export default interface ContactNode extends ElementNode {
    contact: PressContact;
    type: typeof CONTACT_NODE_TYPE;
    uuid: string;
}

export const isPressContactNode = (value: any): value is ContactNode => {
    return (
        isElementNode(value) &&
        value.type === CONTACT_NODE_TYPE &&
        isPressContact(value.contact) &&
        typeof value.uuid === 'string' &&
        value.uuid.length > 0
    );
};
