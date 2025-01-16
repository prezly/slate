import type { NewsroomContact } from '@prezly/sdk';

import type { ContactInfo } from '../sdk';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export const CONTACT_NODE_TYPE = 'contact';

export enum ContactLayout {
    CARD = 'card',
    SIGNATURE = 'signature',
}

export interface ContactNode extends ElementNode {
    type: typeof CONTACT_NODE_TYPE;
    uuid: string;
    reference?: NewsroomContact['uuid'];
    contact: ContactInfo;
    show_avatar: boolean;
    layout: ContactLayout;
}

export function isContactNode(value: any): value is ContactNode {
    return isElementNode<ContactNode>(value, CONTACT_NODE_TYPE);
}
