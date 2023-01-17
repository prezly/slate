import type { ContactNode } from '@prezly/slate-types';
import { CONTACT_NODE_TYPE } from '@prezly/slate-types';
import * as uuid from 'uuid';

type Props = Pick<ContactNode, 'contact'> & Partial<Pick<ContactNode, 'uuid'>>;

export function createPressContact(props: Props): ContactNode {
    return {
        type: CONTACT_NODE_TYPE,
        uuid: uuid.v4(),
        children: [{ text: '' }],
        ...props,
    };
}
