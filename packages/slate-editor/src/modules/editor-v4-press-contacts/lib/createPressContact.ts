import { PressContact } from '../../../types';

import { PRESS_CONTACT_TYPE } from '../constants';
import { PressContactElementType } from '../types';

const createPressContact = (contact: PressContact): PressContactElementType => ({
    children: [{ text: '' }],
    contact,
    type: PRESS_CONTACT_TYPE,
    uuid: contact.uuid,
});

export default createPressContact;
