import type { PressContact } from '../sdk';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export const CONTACT_NODE_TYPE = 'contact';

export interface ContactNode extends ElementNode {
    type: typeof CONTACT_NODE_TYPE;
    contact: PressContact;
    uuid: string;
}

export function isContactNode(value: any): value is ContactNode {
    return isElementNode<ContactNode>(value, CONTACT_NODE_TYPE);
}
