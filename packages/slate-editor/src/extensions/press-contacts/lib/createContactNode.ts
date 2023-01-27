import type { ContactNode } from '@prezly/slate-types';
import { CONTACT_NODE_TYPE, ContactInfo } from '@prezly/slate-types';
import * as uuid from 'uuid';

type Props = Pick<ContactNode, 'contact'> & Partial<Pick<ContactNode, 'uuid' | 'reference'>>;

export function createContactNode({ contact, ...rest }: Props): ContactNode {
    return {
        type: CONTACT_NODE_TYPE,
        uuid: uuid.v4(),
        children: [{ text: '' }],
        contact: ContactInfo.normalize(contact),
        ...rest,
    };
}
