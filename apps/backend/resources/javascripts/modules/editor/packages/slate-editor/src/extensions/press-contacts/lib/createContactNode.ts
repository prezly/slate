import type { ContactNode } from '@prezly/slate-types';
import { ContactLayout } from '@prezly/slate-types';
import { CONTACT_NODE_TYPE, ContactInfo } from '@prezly/slate-types';
import * as uuid from 'uuid';

type Props = Pick<ContactNode, 'contact'> &
    Partial<Pick<ContactNode, 'layout' | 'uuid' | 'reference' | 'show_avatar'>>;

export function createContactNode({ contact, layout, show_avatar, ...rest }: Props): ContactNode {
    return {
        type: CONTACT_NODE_TYPE,
        uuid: uuid.v4(),
        children: [{ text: '' }],
        contact: ContactInfo.normalize(contact),
        show_avatar: show_avatar ?? true,
        layout: layout ?? ContactLayout.CARD,
        ...rest,
    };
}
