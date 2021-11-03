import { Element } from 'slate';

import { PressContact } from '../sdk';

import ElementNode from './ElementNode';

export const CONTACT_NODE_TYPE = 'contact';

export default interface ContactNode extends ElementNode {
    type: typeof CONTACT_NODE_TYPE;
    contact: PressContact;
    uuid: string;
}

export const isContactNode = (value: any): value is ContactNode =>
    Element.isElementType(value, CONTACT_NODE_TYPE);
