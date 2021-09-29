import { PressContact } from '@prezly/slate-types';
import React, { FunctionComponent } from 'react';

import SocialField from './SocialField';

interface Props {
    contact: PressContact;
}

const SocialFields: FunctionComponent<Props> = ({ contact }) => (
    <ul className="editor-v4-press-contact-element__social-fields">
        {contact.email && <SocialField icon="icon-paper-plane">{contact.email}</SocialField>}
        {contact.phone && <SocialField icon="icon-phone">{contact.phone}</SocialField>}
        {contact.mobile && <SocialField icon="icon-mobile">{contact.mobile}</SocialField>}
        {contact.twitter && <SocialField icon="icon-twitter">{contact.twitter}</SocialField>}
        {contact.facebook && <SocialField icon="icon-facebook2">{contact.facebook}</SocialField>}
        {contact.website && <SocialField icon="icon-browser">{contact.website}</SocialField>}
    </ul>
);

export default SocialFields;
